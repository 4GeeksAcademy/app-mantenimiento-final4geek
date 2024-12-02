from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column,DateTime,func,DECIMAL,Numeric


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
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
            "ci_rut": self.ci_rut



            # do not serialize the password, its a security breach
        }
    

class Vehicles(db.Model):
    __tablename__ = 'vehicles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    brand = db.Column(db.String(30))
    model = db.Column(db.String(30))
    year = db.Column(db.Integer)
    mileage = db.Column(db.Integer)
    license_plate = db.Column(db.String(20))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


    user = db.relationship('User',back_populates='vehicles')



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
    name = db.Column(db.String(30), unique=True, nullable=False)
    description = db.Column(db.String(150))


    def __repr__(self):
     return f'Service_Type {self.id}{self.name}{self.description}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
            

        }
    

class Service_status(db.Model):
    __tablename__ = 'service_status'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    description = db.Column(db.String(150))


    def __repr__(self):
     return f'Service_status {self.id}{self.name}{self.description}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            

        }
    

class Services(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.Integer, primary_key=True)
    vehicle_ID = db.Column(db.Integer, db.ForeignKey('vehicles.id'), unique=True, nullable=False)
    Service_Type_ID = db.Column(db.Integer, db.ForeignKey('service_type.id'),unique=False, nullable=False)
    Status_ID = db.Column(db.Integer, db.ForeignKey('service_status.id'), unique=False, nullable=False)
    Start_Date = db.Column(db.String(30))
    End_Date = db.Column(db.String(30))
    Total_Cost = db.Column(db.String(50))
    Payment_status = db.Column(db.String(30))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), server_default=func.now())



    def __repr__(self):
        return f'User {self.id}{self.vehicle_ID}{self.Service_Type_ID}{self.Status_ID}{self.Start_Date}{self.End_Date}{self.Total_Cost}{self.Payment_status}'

    def serialize(self):
        return {
            "id": self.id,
            "vehicle_ID": self.vehicle_ID,
            "Service_Type_ID": self.Service_Type_ID,
            "Status_ID": self.Status_ID,
            "Start_Date": self.Start_Date,
            "End_Date": self.End_Date,
            "Total_Cost": self.Total_Cost,
            "Payment_Status": self.Payment_status

            
        }
    

class Parts(db.Model):
    __tablename__= 'parts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)

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


