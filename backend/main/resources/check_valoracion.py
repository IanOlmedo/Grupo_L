from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ValoracionesModel, PrestamoModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import roles_required

class CheckValoracion(Resource):
    @roles_required(roles=["admin", "biblo", "users"])
    def get(self, id):
        id_usuario = get_jwt_identity()

        # Verifica si el usuario ha hecho un préstamo del libro
        prestamo = db.session.query(PrestamoModel).filter(
            PrestamoModel.id_libros == id,
            PrestamoModel.id_usuario == id_usuario,
            PrestamoModel.estado.in_(['devuelto', 'no devuelto'])
        ).first()

        if not prestamo:
            return {'message': 'El usuario no ha hecho un préstamo de este libro.'}, 403

        # Verifica si el usuario ya ha dejado una valoración para este libro
        valoracion = db.session.query(ValoracionesModel).filter(
            ValoracionesModel.id_libro == id,
            ValoracionesModel.id_usuario == id_usuario
        ).first()

        if valoracion:
            return {'message': 'El usuario ya ha dejado una valoración para este libro.'}, 403

        return {'message': 'El usuario puede dejar una valoración.'}, 200