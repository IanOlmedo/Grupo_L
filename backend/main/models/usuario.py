from .. import db
#Importamos de python 2 funciones
from werkzeug.security import generate_password_hash, check_password_hash

class Usuarios(db.Model):
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100))
    direccion = db.Column(db.String(100))
    dni = db.Column(db.Integer)
    #Mail usado como nombre de usuario
    email = db.Column(db.String(64), unique=True, index=True, nullable=False)
    #Contraseña que será el hash de la pass en texto plano
    password = db.Column(db.String(128), nullable=False)
    #Rol (En el caso que existan diferentes tipos de usuarios con diferentes permisos)
    rol = db.Column(db.String(10), nullable=False, server_default="users")
    telefono = db.Column(db.Integer)
    imagen = db.Column(db.String(100), server_default="assets/Logo-usuario.jpeg")
    #Relación uno a muchos
    configuraciones = db.relationship("Configuracion", back_populates="usuario", cascade="all, delete-orphan")
    #Relación uno a muchos  
    prestamos = db.relationship("Prestamo", back_populates="usuario", cascade="all, delete-orphan")
    # Relación uno a muchos
    valoraciones = db.relationship("Valoraciones", back_populates="usuario", cascade="all, delete-orphan")
    
    def __repr__(self):
        return '<Usuarios: %r >' % (self.nombre_completo)
    
    
    #Getter de la contraseña plana no permite leerla
    @property
    def plain_password(self):
        raise AttributeError('No se puede leer la contraseña')
    #Setter de la contraseña toma un valor en texto plano
    # calcula el hash y lo guarda en el atributo password
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)
        
    #Método que compara una contraseña en texto plano con el hash guardado en la db
    def validate_pass(self,password):
        return check_password_hash(self.password, password)
    
    def to_json(self):
        usuario_json={
            'id_usuario':self.id_usuario,
            'nombre_completo':str(self.nombre_completo),
            'direccion':str(self.direccion),
            'dni':self.dni,
            'email':str(self.email),
            'password':str(self.password),
            'rol': self.rol,
            'telefono':self.telefono,
            'imagen':self.imagen,
        }
        return usuario_json

    def to_json_short(self):
        usuario_json={
            'id_usuario':self.id_usuario,
            'nombre_completo':str(self.nombre_completo),
            'dni':self.dni
        }
        return usuario_json

    def to_json_complete(self):
        prestamos = [prestamo.to_json() for prestamo in self.prestamos]
        usuario_json={
            'id_usuario':self.id_usuario,
            'nombre_completo':str(self.nombre_completo),
            'direccion':str(self.direccion),
            'dni':self.dni,
            'email':str(self.email),
            'password':str(self.password),
            'rol': self.rol,
            'telefono':self.telefono,
            'imagen':self.imagen,
            'prestamos':prestamos
        }
        return usuario_json
    
    @staticmethod
    def from_json(usuario_json):
        id_usuario = usuario_json.get("id_usuario")
        nombre_completo = usuario_json.get("nombre_completo")
        direccion = usuario_json.get("direccion")
        dni = usuario_json.get("dni")
        email = usuario_json.get("email")
        password = usuario_json.get("password")
        rol = usuario_json.get("rol")
        telefono = usuario_json.get("telefono")
        imagen = usuario_json.get("imagen")
        return Usuarios(
            id_usuario = id_usuario,
            nombre_completo = nombre_completo,
            direccion = direccion,
            dni = dni,
            email = email,
            plain_password = password,
            rol = rol,
            telefono = telefono,
            imagen = imagen,
        )