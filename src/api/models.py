from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column,DateTime,func


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