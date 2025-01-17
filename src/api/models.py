from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column,DateTime,func,DECIMAL,Numeric,Enum 


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column((Enum('client', 'admin', name='user_type', default ='client')))
    email = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False) # aumento a 255 porque al hashear se encripta y son más de 20 caractéres.
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    social_reason = db.Column(db.String(50))
    address = db.Column(db.String(30))
    phone = db.Column(db.String(10))
    ci_rut = db.Column(db.Integer)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


    vehicles = db.relationship('Vehicles',back_populates='user')
    schedule = db.relationship('Schedule',back_populates='user')




    def __repr__(self):
        return f'User {self.id}{self.email}{self.first_name}{self.last_name}{self.social_reason}{self.address}{self.phone}{self.ci_rut}'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "social_reason": self.social_reason,
            "address": self.address,
            "phone": self.phone,
            "ci_rut": self.ci_rut,
            "user_type": self.user_type



            # do not serialize the password, its a security breach
        }
    

class Vehicles(db.Model):
    __tablename__ = 'vehicles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'), nullable=False) #Agregue código pra relacionar con el auto con el usuario
    brand = db.Column(db.String(30))
    model = db.Column(db.String(30))
    year = db.Column(db.Integer)
    mileage = db.Column(db.Integer)
    license_plate = db.Column(db.String(20))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


    user = db.relationship('User',back_populates='vehicles')
    schedule = db.relationship('Schedule',back_populates='vehicle')
    service = db.relationship('Services',back_populates='vehicle')


    def __repr__(self):
        return f'Vehicles {self.id}{self.user_id}{self.brand}{self.model}{self.year}{self.mileage}{self.license_plate}'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "brand": self.brand,
            "model": self.model,
            "year": self.year,
            "mileage": self.mileage,
            "license_plate": self.license_plate


        }    
    

class Service_Type(db.Model):
    __tablename__ = 'service_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column((Enum('Cambio de Aceite y filtro','Alineación y Balanceo', 'Rotación de Neumáticos', 'Mecanica Ligera', name='name',)))
    description = db.Column(db.String(150))
    cost = db.Column((Enum('$1.500','$12.000', '$4.000', '$8.000', name='cost',)))
    services = db.relationship('Services', back_populates='service_type')

    def __repr__(self):
        return f'Service_Type {self.id} {self.name} {self.description} {self.cost}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "cost": str(self.cost)  # LIF Se convierte a string para evitar problemas de serialización
        }

    

# class Service_status(db.Model):
#     __tablename__ = 'service_status'
#     id = db.Column(db.Integer, primary_key=True)
#     status = db.Column((Enum('Agendado','Ingresado', 'En Proceso', 'Finalizado', name='name', default='Agendado')))

#     description = db.Column(db.String(150))


#     status = db.relationship('Services', back_populates = 'service_status')



#     def __repr__(self):
#      return f'Service_status {self.id}{self.name}{self.description}'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "description": self.description,
            

#         }
    

class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    vehicle_ID = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=False)
    Service_Type_ID = db.Column(db.Integer, db.ForeignKey('service_type.id'),unique=False, nullable=False)
    status = db.Column((Enum('Agendado','Ingresado', 'En Proceso', 'Finalizado', name='name', default='Agendado')))
    Start_Date = db.Column(db.String(30))
    End_Date = db.Column(db.String(30))
    Total_Cost = db.Column(db.String(50))
    Payment_status = db.Column(db.String(30))
    User_ID = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True) #Es para relacionar solo los servicios de un usuario específico LIF
    user = db.relationship('User', backref='services')#idem arriba
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), server_default=func.now())

    schedule = db.relationship('Schedule', back_populates = 'service')
    notes = db.relationship('Notes', back_populates = 'service')
    vehicle = db.relationship('Vehicles', back_populates = 'service')
    service_type = db.relationship('Service_Type', back_populates = 'services')
    parts = db.relationship('Parts_Service',back_populates='service_id')




    def __repr__(self):
        return f'User {self.id}{self.vehicle_ID}{self.Service_Type_ID}{self.status}{self.Start_Date}{self.End_Date}{self.Total_Cost}{self.Payment_status}'

    def serialize(self):
        return {
            "id": self.id,
            "vehicle_ID": self.vehicle_ID,
            "Service_Type_ID": self.Service_Type_ID,
            "status" : self.status,
            "Start_Date": self.Start_Date,
            "End_Date": self.End_Date,
            "Total_Cost": self.Total_Cost,
            "Payment_Status": self.Payment_status,
            "User_ID": self.User_ID

            
        }
    

class Parts(db.Model):
    __tablename__= 'parts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)


    parts_service = db.relationship('Parts_Service',back_populates='parts_id')



    def __repr__(self):
     return f'Parts {self.id}{self.name}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            

        }


class Parts_Service(db.Model):
    __tablename__ = 'parts_service'
    id = db.Column(db.Integer, primary_key=True)
    Service_ID = db.Column(db.Integer, db.ForeignKey('services.id'))
    Parts_ID = db.Column(db.Integer, db.ForeignKey('parts.id') )
    Quantity = db.Column(db.Integer)
    Cost = db.Column(DECIMAL(10, 2), nullable=False)


    service_id = db.relationship('Services',back_populates='parts')
    parts_id = db.relationship('Parts',back_populates='parts_service')



    def __repr__(self):
     return f'Parts_Service{self.id}{self.Service_ID}{self.Parts_ID}{self.Quantity}{self.Cost}'

    def serialize(self):
        return {
            "id": self.id,
            "Service_ID": self.Service_ID,
            "Parts_ID": self.Parts_ID,
            "Quantity": self.Quantity,
            "Cost": self.Cost
            

        }
    

class Notes(db.Model):
   __tablename__ = 'notes'
   id = db.Column(db.Integer, primary_key=True)
   Service_ID = db.Column(db.Integer, db.ForeignKey('services.id'))
   Text = db.Column(db.String(300))


   service = db.relationship('Services', back_populates = 'notes')


   def __repr__(self):
     return f'Notes {self.id}{self.Service_ID}{self.Text}'

   def serialize(self):
        return {
            "id": self.id,
            "Service_ID": self.Service_ID,
            "Text": self.Text
            

        }
   
class Schedule(db.Model):
   __tablename__ = 'schedule'
   id = db.Column(db.Integer, primary_key=True)
   User_ID = db.Column(db.Integer, db.ForeignKey('user.id'))
   Vehicle_ID = db.Column(db.Integer, db.ForeignKey('vehicles.id'))
   Date = db.Column(DateTime(timezone=True), server_default=func.now())
   Service_ID = db.Column(db.Integer, db.ForeignKey('services.id'))
   Status = db.Column(db.String(30))

   user = db.relationship('User',back_populates='schedule')
   vehicle = db.relationship('Vehicles',back_populates='schedule')
   service = db.relationship('Services', back_populates = 'schedule')


   def __repr__(self):
        return f'Schedule {self.id}{self.User_ID}{self.Vehicle_ID}{self.Date}{self.Service_ID}{self.Status}'

   def serialize(self):
        return {
            "id": self.id,
            "User_id": self.User_ID,
            "Vehicle_ID": self.Vehicle_ID,
            "Date": self.Date,
            "Service_ID": self.Service_ID,
            "Status": self.Status,


        }   
#Tabla vender vahículo
class VehicleSales(db.Model):
    __tablename__ = 'vehicle_sales'
    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Vendedor
    sale_price = db.Column(DECIMAL(10, 2), nullable=False)
  

    # Relaciones
    vehicle = db.relationship('Vehicles', backref='sales')
    user = db.relationship('User', backref='sales')

    def __repr__(self):
        return f"VehicleSales {self.id} - Vehicle ID {self.vehicle_id} - Sold by User {self.user_id} - Price {self.sale_price}"

    def serialize(self):
        return {
            "id": self.id,
            "vehicle_id": self.vehicle_id,
            "user_id": self.user_id,
          "sale_price": str(self.sale_price),
                 }


