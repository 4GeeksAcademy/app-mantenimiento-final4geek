  
import os
from flask_admin import Admin
from .models import db, User, Vehicles, Service_Type, Services, Parts, Parts_Service, Notes, Schedule, VehicleSales
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Vehicles, db.session))
    admin.add_view(ModelView(Service_Type, db.session))
    admin.add_view(ModelView(Services, db.session))
    admin.add_view(ModelView(Parts, db.session))
    admin.add_view(ModelView(Parts_Service, db.session))
    admin.add_view(ModelView(Notes, db.session))
    admin.add_view(ModelView(Schedule, db.session))
    admin.add_view(ModelView(VehicleSales, db.session))




    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))