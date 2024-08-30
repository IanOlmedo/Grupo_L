from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ConfiguracionModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import roles_required

class Configuracion(Resource):
    @roles_required(roles = ["admin"])
    def get(self,id):
        configuracion = db.session.query(ConfiguracionModel).get_or_404(id)
        return configuracion.to_json(), 201

    @roles_required(roles = ["admin"])
    def put(self, id): 
        configuracion = db.session.query(ConfiguracionModel).get_or_404(id)
        data = request.get_json().items()
        for key, values in data:
            setattr(configuracion, key, values)
        db.session.add(configuracion)
        db.session.commit() 
        return configuracion.to_json(), 201

    @roles_required(roles = ["admin"])
    def delete(self,id):
        configuracion = db.session.query(ConfiguracionModel).get_or_404(id)
        db.session.delete(configuracion)
        db.session.commit()
        return 'Ha sido eliminado correctamente', 204
        
class Configuraciones(Resource):
    @roles_required(roles = ["admin"])
    def get(self):
        configuraciones = db.session.query(ConfiguracionModel).all()
        return jsonify([configuracion.to_json() for configuracion in configuraciones])
    
    @roles_required(roles = ["admin"])
    def post(self):
        configuracion = ConfiguracionModel.from_json(request.get_json())
        db.session.add(configuracion)
        db.session.commit()
        return configuracion.to_json(), 201