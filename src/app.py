from flask import Flask, request, jsonify, send_from_directory
import os
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import create_access_token
from api.utils import APIException, generate_sitemap
from api.models import db, Services, Vehicles, User, Service_status
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_cors import CORS  # Importa Flask-CORS

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

    if not user or user.password != password:
        return jsonify({"msg": "Email o contraseña incorrecto"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200,

@app.route('/registro', methods=['POST'])
def register():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg":"Debes enviar información en el body"}), 400
    email = request.json.get('email')
    password = request.json.get('password')
    if not email:
        return jsonify({"msg": "Campo email vacío"}), 400
    if not password:
        return jsonify({"msg": "Campo contraseña vacío"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email ya está en uso"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201 

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

@app.route('/api/servicios', methods=['POST'])
def crear_servicio():
    body = request.get_json(silent=True)
    if not body:
        return jsonify({"msg": "Debes enviar información en el body"}), 400
    required_fields = ['vehicle_ID', 'Service_Type_ID', 'Start_Date', 'End_Date', 'Total_Cost', 'Payment_status']
    for field in required_fields:
        if field not in body or not body[field]:
            return jsonify({"msg": f"El campo '{field}' es obligatorio"}), 400
    try:
        nuevo_servicio = Services(
            vehicle_ID=body['vehicle_ID'],
            Service_Type_ID=body['Service_Type_ID'],
            Status_ID=1,  # Estado inicial al ingresar al taller Revisar
            Start_Date=body['Start_Date'],
            End_Date=body['End_Date'],
            Total_Cost=body['Total_Cost'],#Quitar se toma de la tabla de servicios.
            Payment_status=body['Payment_status']
        )
        db.session.add(nuevo_servicio)
        db.session.commit()
        return jsonify(nuevo_servicio.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al crear el servicio: {str(e)}"}), 500

@app.route('/api/servicios', methods=['GET'])
def obtener_servicios():
    try:
        servicios = Services.query.all()
        if not servicios:
            return jsonify({"msg": "No se encontraron servicios"}), 404
        return jsonify([s.serialize() for s in servicios]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los servicios: {str(e)}"}), 500

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

@app.route('/api/vehiculos', methods=['POST'])
@jwt_required()
def crear_vehiculo():
    user_id = get_jwt_identity()  #  ID del usuario autenticado
    body = request.get_json(silent=True)
    
    
    if not body:
        return jsonify({"msg": "Debes enviar información en el body"}), 400
    
    
    required_fields = ['brand', 'model', 'year', 'license_plate']
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
            license_plate=body['license_plate']
        )
        db.session.add(nuevo_vehiculo)
        db.session.commit()
        return jsonify(nuevo_vehiculo.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al crear el vehículo: {str(e)}"}), 500
    

@app.route('/api/vehiculos', methods=['GET'])
def obtener_vehiculos():
    try:
        vehiculos = Vehicles.query.all()
        if not vehiculos:
            return jsonify({"msg": "No se encontraron vehículos"}), 404
        return jsonify([v.serialize() for v in vehiculos]), 200
    except Exception as e:
        return jsonify({"msg": f"Error al obtener los vehículos: {str(e)}"}), 500

@app.route('/api/clientes', methods=['GET'])
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

#Acá verificamos que el cliente solo puede agendar vehículos propios
@app.route('/api/agendar', methods=['POST'])
@jwt_required()
def agendar():
    user_id = get_jwt_identity()
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Debes enviar información en el body"}), 400

    vehicle = Vehicles.query.filter_by(id=body['vehicle_ID'], user_id=user_id).first()
    if not vehicle:
        return jsonify({"msg": "El vehículo no está asociado a tu cuenta"}), 403

    nuevo_servicio = Services(
        vehicle_ID=body['vehicle_ID'],
        Service_Type_ID=body['Service_Type_ID'],
        Status_ID=1,  # Estado inicial
        Start_Date=body['Start_Date'],
        End_Date=body['End_Date'],
        Total_Cost=body['Total_Cost'],
        Payment_status='Pendiente',
        User_ID=user_id
    )
    db.session.add(nuevo_servicio)
    db.session.commit()
    return jsonify(nuevo_servicio.serialize()), 201

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

    

#End Endpoints Ignacio

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)