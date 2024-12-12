from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import ValoracionesModel
from sqlalchemy import desc, func
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import roles_required

class Valoracion(Resource):
    @jwt_required(optional=True)
    def get(self):
        page = 1

        per_page = 3

        #no ejecuto el .all()
        valoracion = db.session.query(ValoracionesModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        #Filtros
        #Bucar por id_valoracion 
        if request.args.get("id_valoracion"):
            valoracion = valoracion.filter(ValoracionesModel.id_valoracion == request.args.get("id_valoracion"))

        #Busqueda por libro
        if request.args.get('id_libro'):
            valoracion = valoracion.filter(ValoracionesModel.id_libro == request.args.get('id_libro'))

        #Busqueda por usuario
        if request.args.get('id_usuario'):
            valoracion = valoracion.filter(ValoracionesModel.id_usuario == request.args.get('id_usuario'))

        #Ordenamiento por fecha
        if request.args.get('sortby_fecha_de_valoracion'):
            valoracion = valoracion.order_by(desc(ValoracionesModel.fecha_de_valoracion))


        #terminan los filtros

        #Paginacion
        valoraciones = valoracion.paginate(page=page, per_page=per_page, error_out=False)
        
        #Obtener valor paginado
        return jsonify({ 'valoraciones': [valoracion.to_json_complete() for valoracion in valoraciones], 
                        'total': valoraciones.total,
                        'paginas': valoraciones.pages,
                        'pagina': page})
    

    @roles_required(roles = ["admin","biblo", "users"])
    def post(self):
        valoracion= ValoracionesModel.from_json(request.get_json())
        print(valoracion)
        try:
            db.session.add(valoracion)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return valoracion.to_json(), 201