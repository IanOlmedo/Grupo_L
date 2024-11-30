from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail

api = Api()

db = SQLAlchemy()

migrate = Migrate()

jwt = JWTManager()

mailsender = Mail()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    if not os.path.exists(os.getenv('DATABASE_PATH')+ os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH') + os.getenv('DATABASE_NAME'))
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.getenv('DATABASE_PATH') + os.getenv('DATABASE_NAME')
    db.init_app(app)

    import main.resources as resources

    api.add_resource(resources.UsuariosResources, "/Usuarios")
    api.add_resource(resources.UsuarioResources, "/Usuario/<id>")
    #api.add_resource(resources.Sign_inResources,"/Sign_in")
    #api.add_resource(resources.LoginResources,"/Login")
    api.add_resource(resources.LibrosResources,"/Libros")
    api.add_resource(resources.LibroResources,"/Libro/<id>")
    api.add_resource(resources.PrestamosResources, "/Prestamos")
    api.add_resource(resources.PrestamoResources, "/Prestamo/<id>")   
    api.add_resource(resources.ValoracionResources, "/Valoracion")
    api.add_resource(resources.AutorResources, "/Autor/<id>")
    api.add_resource(resources.AutoresResources, "/Autores")
    
    api.init_app(app)
    
    #Cargar clave secreta
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    #Cargar tiempo de expiración de los tokens
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)
    
    from main.auth import routes
    #Importar blueprint
    app.register_blueprint(routes.auth)
    
    #Configuración de mail
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')
    #Inicializar en app
    mailsender.init_app(app)

    return app 
