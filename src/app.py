from flask import Flask, request, jsonify, send_from_directory
import os
from flask_migrate import Migrate
from flask_swagger import swagger

from flask_jwt_extended import create_access_token
from api.utils import APIException, generate_sitemap
from api.models import db, Services, Vehicles, User, Service_Type, VehicleSales
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_cors import CORS  # Importa Flask-CORS
from werkzeug.security import generate_password_hash  # Solución para hashear contraseña, y asegurar que no se guarden en texto plano. 
from werkzeug.security import check_password_hash
from flask import Blueprint, request, jsonify

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


CORS(app)  # Habilita CORS para todas las rutas por error al provar flux.js

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SSKEY")
jwt = JWTManager(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg":"Debes enviar información en el body"}), 400
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Email o contraseña incorrecto"}), 401
    
    additional_claims = {"user_type":user.serialize()["user_type"]}

    #access_token = create_access_token(identity=str(user.id),additional_claims=additional_claims)# Modifique porque create_acces_token necesita un valor que se serialize como un string por ej. 
    access_token = create_access_token(identity=str(user.id))
    print(user.serialize())
    print(f"Token JWT:{access_token} ") #Borrar luego, es para probar token en el resto de los endpoints
    return jsonify({"access_token":access_token, "user_type":user.serialize()["user_type"]}), 200
#Logout
@app.route('/logout', methods=['POST'])
def logout():
  auth_header = request.headers.get('Authorization')
  if not auth_header:
    return jsonify({'message': 'Missing authorization header'}), 401
  try:
    token_type, token = auth_header.split(maxsplit=1)
    if token_type.lower() != 'bearer':
      return jsonify({'message': 'Invalid authorization type'}), 401
  except ValueError:
    return jsonify({'message': 'Invalid authorization header'}), 401
  return jsonify({'message': 'Successfully logged out'}), 200

#Crear userAdmin
@app.route('/registro-admin', methods=['POST'])
@jwt_required()
def register_admin():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg":"Debes enviar información en el body"}), 400
    email = request.json.get('email')
    password = request.json.get('password')
    first_name = request.json.get('first_name')
    last_name = request.json.get ('last_name')
   

    fields= ["email","password","first_name","last_name"]
    for field in fields:
        if not field:
            return jsonify(f'El campo {field} es obligatorio'), 400   
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email ya está en uso"}), 400
    
    current_user_id = get_jwt_identity()
    user=User.query.get(current_user_id)
    if user.serialize()["user_type"] != "admin": 
        return jsonify({"msg":"cuidado infractor, no estas autorizado"}), 403

    # Codigo para hashear contraseña y evitar que se guarde en texto plano
    hashed_password = generate_password_hash(password)

    new_user = User(user_type ="admin",
                     email=email, 
                     password=hashed_password,
                     is_active=True, 
                     first_name = first_name, 
                     last_name = last_name) 
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201 



@app.route('/registro', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes enviar información en el body"}), 400
    email = request.json.get('email')
    password = request.json.get('password')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    phone = request.json.get('phone')
    ci_rut = request.json.get('ci_rut')

    fields = ["email", "password", "first_name", "last_name", "phone", "ci_rut"]
    for field in fields:
        if not locals()[field]:
            return jsonify({"msg": f"El campo {field} es obligatorio"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email ya está en uso"}), 400

    # Codigo para hashear contraseña y evitar que se guarde en texto plano
    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password, is_active=True, user_type="client")
    db.session.add(new_user)
    db.session.commit()

    # Incluir todos los campos necesarios en la respuesta
    return jsonify({
        "email": new_user.email,
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone,
        "ci_rut": ci_rut
    }), 201



@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Debes enviar información en el body"}), 400

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.serialize()), 200

@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicles.query.all()
    vehicles_list = [vehicle.serialize() for vehicle in vehicles]
    return jsonify(vehicles_list), 200


#Start Endpoints Ignacio

#Agendar Servicios del lado de admin
@app.route('/api/servicios', methods=['POST'])
@jwt_required()
def create_service():
    current_user_id = get_jwt_identity()

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400

    required_fields = ['vehicle_ID', 'Service_Type_ID']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # Data validation (adjust according to your needs)
    try:
        vehicle_ID = int(data['vehicle_ID'])
        Service_Type_ID = int(data['Service_Type_ID'])
        # ... other validations
    except ValueError:
        return jsonify({'error': 'Invalid data format'}), 400

    try:
        new_service = Services(
            vehicle_ID=vehicle_ID,
            Service_Type_ID=Service_Type_ID,
            User_ID=current_user_id,
        )
        db.session.add(new_service)
        db.session.commit()

        return jsonify({'message': 'Service created successfully', 'service': new_service.serialize()}), 201
    except Exception as e:
        db.session.rollback()  # Rollback transaction in case of error
        return jsonify({'error': str(e)}), 500

@app.route('/api/servicios', methods=['GET'])
def obtener_servicios():
    try:
        servicios = Services.query.all()
        if not servicios:
            return jsonify({"msg": "No se encontraron servicios"}), 404
        return jsonify([s.serialize() for s in servicios]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los servicios: {str(e)}"}), 500
    
@app.route('/api/servicetypes', methods=['GET'])
def obtener_service_types():
    try:
        service_types = Service_Type.query.all()
        if not service_types:
            return jsonify({"msg": "No se encontraron tipos de servicios"}), 404
        return jsonify([st.serialize() for st in service_types]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los tipos de servicios: {str(e)}"}), 500

@app.route('/api/servicios/<int:id>', methods=['PUT'])
def actualizar_servicio(id):
    servicio = Services.query.get(id)
    if not servicio:
        return jsonify({"msg": "Servicio no encontrado"}), 404

    body = request.get_json(silent=True)
    if not body:
        return jsonify({"msg": "Debes enviar información en el body"}), 400


    try:
        servicio.Status_ID = body.get('Status_ID', servicio.Status_ID)
        db.session.commit()
        return jsonify(servicio.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al actualizar el servicio: {str(e)}"}), 500
    
#Endopoint 09-12-2024 para crear vehículos LIF

@app.route('/api/vehicle', methods=['POST']) # Listo probado y funcionando nachito supercampeón.  
@jwt_required()
def crear_vehiculo():
    user_id = get_jwt_identity()  #  token del usuario autenticado
    body = request.get_json(silent=True)
    
    
    if not body:
        return jsonify({"msg": "Debes enviar información en el body"}), 400
    
    
    required_fields = ['brand', 'model', 'year','mileage', 'license_plate']
    for field in required_fields:
        if field not in body or not body[field]:
            return jsonify({"msg": f"El campo '{field}' es obligatorio"}), 400

    # Creamos el vehículo asociado al usuario autenticado
    try:
        nuevo_vehiculo = Vehicles(
            user_id=user_id,
            brand=body['brand'],
            model=body['model'],
            year=body['year'],
            mileage=body['mileage'],
            license_plate=body['license_plate']
        )
        db.session.add(nuevo_vehiculo)
        db.session.commit()
        return jsonify(nuevo_vehiculo.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al crear el vehículo: {str(e)}"}), 500
    

@app.route('/vehicle', methods=['GET'])#Probado y funcionando
def obtener_vehiculos():
    try:
        vehiculos = Vehicles.query.all()
        if not vehiculos:
            return jsonify({"msg": "No se encontraron vehículos"}), 404
        return jsonify([v.serialize() for v in vehiculos]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los vehículos: {str(e)}"}), 500

@app.route('/clientes', methods=['GET'])#Funciona trae todos los user con tipo "Client"
def obtener_clientes():
    try:
        clientes = User.query.filter_by(user_type='client').all()
        if not clientes:
            return jsonify({"msg": "No se encontraron clientes"}), 404
        return jsonify([cliente.serialize() for cliente in clientes]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los clientes: {str(e)}"}), 500

@app.route('/api/estados', methods=['GET'])
def obtener_estados():
    try:
        estados = Service_status.query.all()
        if not estados:
            return jsonify({"msg": "No se encontraron estados"}), 404
        return jsonify([estado.serialize() for estado in estados]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los estados: {str(e)}"}), 500
    
#Esto asegura que los usuarios "Cliente", solo vean sus propios servicios    

@app.route('/api/mis-servicios', methods=['GET'])
@jwt_required()
def mis_servicios():
    user_id = get_jwt_identity()   
    servicios = Services.query.filter_by(User_ID=user_id).all()
    if not servicios:
        return jsonify({"msg": "No hay servicios regisrados a su nombre"}), 404
    return jsonify([servicio.serialize()for servicio in servicios]), 200 

#Acá verificamos que el cliente solo puede agendar vehículos propios del cliente
@app.route('/api/agendar', methods=['POST'])
@jwt_required()
def agendar():
    user_id = get_jwt_identity()
    body = request.get_json()
    
    if not body:
        return jsonify({"msg": "Debes enviar información en el body"}), 400

    # Verificar que el vehículo pertenece al usuario autenticado
    vehicle = Vehicles.query.filter_by(id=body['vehicle_ID'], user_id=user_id).first()
    if not vehicle:
        return jsonify({"msg": "El vehículo no está asociado a tu cuenta"}), 403

    # Obtener el servicio desde Service_Type para extraer el precio
    service_type = Service_Type.query.get(body['Service_Type_ID'])
    if not service_type:
        return jsonify({"msg": "El tipo de servicio seleccionado no existe"}), 404

    # Calcular el total del servicio
    total_cost = service_type.price

    try:
        nuevo_servicio = Services(
            vehicle_ID=body['vehicle_ID'],
            Service_Type_ID=body['Service_Type_ID'],
            User_ID=user_id
        )
        db.session.add(nuevo_servicio)
        db.session.commit()

        return jsonify({
            "msg": "Servicio agendado exitosamente",
            "service": nuevo_servicio.serialize()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al agendar el servicio: {str(e)}"}), 500


#Acá verificamos que la vista de todos los servicios sea accesible, solamente a los usuarios internos.
@app.route('/api/todos-los-servicios', methods=['GET'])
@jwt_required()
def todos_los_servicios():
    servicios = Services.query.all()
    if not servicios:
        return jsonify({"msg": "No se encontraron servicios"}), 404
    return jsonify([servicio.serialize() for servicio in servicios]), 200

#Endpoint para que solo los usuarios internos puedan actualizar estado del servicio
@app.route('/api/actualizar-estado/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_estado(id):
    body = request.get_json()
    if not body or 'Status_ID' not in body:
        return jsonify({"msg": "Debes actualiar el estado"}), 400

    servicio = Services.query.get(id)
    if not servicio:
        return jsonify({"msg": "Servicio no encontrado"}), 404

    servicio.Status_ID = body['Status_ID']
    db.session.commit()
    return jsonify(servicio.serialize()), 200

#POST crear servicios por parte de Usuario Admin

@app.route('/api/crear-tipo-servicio', methods=['POST'])
@jwt_required()
def crear_tipo_servicio():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user or user.user_type != 'admin':
        return jsonify({"msg": "No tiene permisos para crear tipos de servicios"}), 403

    body = request.get_json(silent=True)
    if not body:
        return jsonify({"msg": "Debe enviar información en el body"}), 400

    required_fields = ['name', 'description', 'price']
    for field in required_fields:
        if field not in body or not body[field]:
            return jsonify({"msg": f"El campo '{field}' es obligatorio"}), 400

    try:
        nuevo_tipo_servicio = Service_Type(
            name=body['name'],
            description=body['description'],
            price=body['price']  
        )
        db.session.add(nuevo_tipo_servicio)
        db.session.commit()

        return jsonify({
            "msg": "Tipo de servicio creado exitosamente",
            "service_type": nuevo_tipo_servicio.serialize()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al crear el tipo de servicio: {str(e)}"}), 500
    
    #Registrar venta de vehículos



@app.route('/api/vender', methods=['POST'])
@jwt_required()
def sell_vehicle():
    user_id = get_jwt_identity()  # Usuario autenticado
    data = request.get_json()
    vehicle_id = data.get("vehicle_id")
    print(vehicle_id)

    sale_price = data.get("sale_price")

    if not vehicle_id or not sale_price:
        return jsonify({"error": "vehicle_id y sale_price son requeridos"}), 400

    # Verificar si el vehículo pertenece al usuario
    vehicle = Vehicles.query.filter_by(id=vehicle_id, user_id=user_id).first()
    if not vehicle:
        return jsonify({"error": "Vehículo no encontrado o no pertenece al usuario"}), 404

    # Crear la venta
    try:
        sale = VehicleSales(
            vehicle_id=vehicle_id,
            user_id=user_id,
            sale_price=sale_price
        )
        db.session.add(sale)
        db.session.commit()
        return jsonify(sale.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



    

#End Endpoints Ignacio

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)