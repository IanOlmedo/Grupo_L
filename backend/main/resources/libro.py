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
    
    @roles_required(roles = ["admin", "biblo"])
    def put(self,id):
        libro = db.session.query(LibroModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if key == 'anio_de_publicacion':
                anio_de_publicacion = datetime.strptime(value, '%d-%m-%Y')
                setattr(libro, key, anio_de_publicacion)
            elif key == 'autores': 
                nombres_autores = value
                if nombres_autores:
                    nombres_lista = [nombre.strip() for nombre in nombres_autores.split(',')]
                    nuevos_autores = []
                    for nombre in nombres_lista:
                        autor = AutorModel.query.filter_by(nombre_completo=nombre).first()
                        if autor:
                            nuevos_autores.append(autor)
                        """
                        else:
                            nuevo_autor = AutorModel(nombre_completo=nombre)
                            db.session.add(nuevo_autor)
                            db.session.commit()
                            nuevos_autores.append(nuevo_autor)
                        """
                    libro.autor = nuevos_autores
            else:
                setattr(libro, key, value)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json() , 201

    @roles_required(roles = ["admin", "biblo"])
    def delete(self,id):
        print("hola")
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
            libros=libros.outerjoin(LibroModel.valoracion).group_by(LibroModel.id_libro).having(func.count(ValoracionesModel.id_valoracion) >= int(request.args.get('nrValoraciones ')))

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

        #Obtener los libros con más valoraciones
        if request.args.get('top_valoraciones'):
            libros = libros.outerjoin(LibroModel.valoracion).group_by(LibroModel.id_libro).order_by(desc(func.count(ValoracionesModel.id_valoracion)))
            
        ### FIN FILTROS ####
        
        #Obtener valor paginado
        libros = libros.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'libros': [libro.to_json_complete() for libro in libros],
                'total_de_libros': libros.total,
                'paginas': libros.pages,
                'pagina': page
                })
    @roles_required(roles = ["admin", "biblo"])
    def post(self):
        
        autores_nombres = request.get_json().get('autores')
        libro = LibroModel.from_json(request.get_json())
        
        if autores_nombres:
            nombres_lista = [nombre.strip() for nombre in autores_nombres.split(',')]
            for nombre in nombres_lista:
                autor = AutorModel.query.filter_by(nombre_completo=nombre).first()
                if autor:
                    libro.autor.append(autor)
            
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201