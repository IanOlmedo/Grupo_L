from flask_restful import Resource
from flask import request, jsonify
from .. import db
from datetime import datetime
from main.models import LibroModel, ValoracionesModel, AutorModel
from sqlalchemy import func,desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import roles_required

class Libro(Resource):
    @jwt_required(optional=True)
    def get(self,id):
    
        libro = db.session.query(LibroModel).get_or_404(id)
        return libro.to_json_complete(), 201 
    
    @roles_required(roles = ["admin"])
    def put(self,id):
        libro = db.session.query(LibroModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if key == 'año_de_publicacion':
                año_de_publicacion = datetime.strptime(value, '%d-%m-%Y')
                setattr(libro, key, año_de_publicacion)
            else:
                setattr(libro, key, value)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json() , 201

    @roles_required(roles = ["admin"])
    def delete(self,id):
        libro = db.session.query(LibroModel).get_or_404(id)
        db.session.delete(libro)
        db.session.commit()
        return "El libro fue eliminado correctamente", 204
    

class Libros(Resource):
    @jwt_required(optional=True)
    def get(self):
        #Página inicial por defecto
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 12  
        
        #no ejecuto el .all()
        libros = db.session.query(LibroModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        if request.args.get('nrValoraciones'):
            libros=libros.outerjoin(LibroModel.valoracion).group_by(LibroModel.id).having(func.count(ValoracionesModel.id) >= int(request.args.get('nrValoraciones ')))

        #Busqueda por titulo
        if request.args.get('titulo'): 
            libros=libros.filter(LibroModel.titulo.like("%"+request.args.get('titulo')+"%"))
        
        #Ordeno por titulo
        if request.args.get('sortby_titulo'):
            libros=libros.order_by(desc(LibroModel.titulo))
        
        #Busqueda por genero
        if request.args.get('genero'): 
            libros=libros.filter(LibroModel.genero.like("%"+request.args.get('genero')+"%"))
        
        #Ordeno por genero
        if request.args.get('sortby_genero'):
            libros=libros.order_by(desc(LibroModel.genero))
        
        #Busqueda por descripcion 
        if request.args.get('descripcion'): 
            libros=libros.filter(LibroModel.descripcion.like("%"+request.args.get('descripcion')+"%"))
        
        #Ordeno por descripcion 
        if request.args.get('sortby_descripcion'):
            libros=libros.order_by(desc(LibroModel.descripcion)) 
            
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        libros = libros.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'libros': [libro.to_json_complete() for libro in libros],
                'total_de_libros': libros.total,
                'paginas': libros.pages,
                'pagina': page
                })
    @roles_required(roles = ["admin"])
    def post(self):
        
        autores_ids = request.get_json().get('autores')
        libro = LibroModel.from_json(request.get_json())
        
        if autores_ids:
            # Obtener las instancias de auntor basadas en las ids recibidas
            autores = AutorModel.query.filter(AutorModel.id.in_(autores_ids)).all()
            # Agregar las instancias de auntor a la lista de autores del libro
            libro.exhibiciones.extend(autores)
            
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201