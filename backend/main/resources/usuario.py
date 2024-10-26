from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel, PrestamoModel
from sqlalchemy import func, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import roles_required

class Usuario(Resource):
    @jwt_required(optional=True)
    def get(self,id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
    
        current_identity = get_jwt_identity()
        if current_identity:
            return usuario.to_json_complete(), 201
        else:
            return usuario.to_json(), 201
    
    @roles_required(roles = ["admin", "users"])
    def delete(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return 'Ha sido eliminado correctamente', 204
    
    @roles_required(roles = ["admin", "users"])
    def put(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, values in data:
            setattr(usuario, key, values)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201

class Usuarios(Resource):
    @roles_required(roles = ["admin"])
    def get(self):
        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 4
        
        #no ejecuto el .all()
        usuarios = db.session.query(UsuarioModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        if request.args.get('nrPrestamos'):
            usuarios=usuarios.outerjoin(UsuarioModel.prestamos).group_by(UsuarioModel.id).having(func.count(PrestamoModel.id) >= int(request.args.get('nrPrestamos')))

        #Busqueda por nombre completo
        #http://127.0.0.1:6003/Usuarios?nombre_completo=Maximo
        if request.args.get('nombre_completo'): 
            usuarios=usuarios.filter(UsuarioModel.nombre_completo.like("%"+request.args.get('nombre_completo')+"%"))
        
        #Ordeno por nombre_completo
        if request.args.get('sortby_nombre_completo'):
            usuarios=usuarios.order_by(desc(UsuarioModel.nombre_completo))
        
        #Busqueda por DNI
        #http://127.0.0.1:6003/Usuarios?dni=45564852
        if request.args.get('dni'): 
            usuarios=usuarios.filter(UsuarioModel.dni.like("%"+request.args.get('dni')+"%"))
        
        #Ordeno por DNI
        if request.args.get('sortby_dni'):
            usuarios=usuarios.order_by(desc(UsuarioModel.dni))
        
        #Busqueda por email
        #http://127.0.0.1:6003/Usuarios?email=ian.olmedo@alumno.um.edu.ar
        if request.args.get('email'): 
            usuarios=usuarios.filter(UsuarioModel.email.like("%"+request.args.get('email')+"%"))
        
        #Ordeno por email
        if request.args.get('sortby_email'):
            usuarios=usuarios.order_by(desc(UsuarioModel.email)) 
            
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                'total de usuarios': usuarios.total,
                'paginas': usuarios.pages,
                'pagina': page
                })


    #Insertar recurso
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        print(usuario)
        try:
            db.session.add(usuario)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return usuario.to_json(), 201