from flask_restful import Resource
from flask import request

NOTIFICACIONES = {
    1:{"usuario":"Ian Olmedo", "mensaje":"Mañana es tu fecha de vencimiento", "hora":"27/04/2024"},
    2:{"usuario":"Reynier Lopez", "mensaje":"Mañana es tu fecha de vencimiento", "hora":"29/04/2024"},
}

class Notificaciones(Resource):
    def post(self):
        notificacion = request.get_json()
        id = int(max(NOTIFICACIONES.keys())) + 1
        NOTIFICACIONES[id] = notificacion
        return NOTIFICACIONES[id], 201