from flask_restful import Resource
from flask import request, jsonify
from .. import db
from datetime import datetime
from main.models import PrestamoModel
from sqlalchemy import extract, desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import roles_required
#post crea y put actualiza

class Prestamo(Resource):
    @roles_required(roles = ["admin", "users"])
    def get(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        return prestamo.to_json_complete(), 201
    
    @roles_required(roles = ["admin"])
    def delete(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return 'El prestamo fue eliminado correctamente', 204
    
    @roles_required(roles = ["admin"])
    def put(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if key == 'fecha_de_entrega':
                fecha_de_entrega = datetime.strptime(value, '%d-%m-%Y')
                setattr(prestamo, key, fecha_de_entrega)
            elif key == 'fecha_de_vencimiento':
                fecha_de_vencimiento = datetime.strptime(value, '%d-%m-%Y')
                setattr(prestamo, key, fecha_de_vencimiento)
            else:
                setattr(prestamo, key, value)
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201


class Prestamos(Resource):
    @roles_required(roles = ["admin", "users"])
    def get(self):
        page = 1
        per_page = 5

        filters = request.args.to_dict()

        prestamos = db.session.query(PrestamoModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        for key, value in filters.items():
            if key == "id_usuario":
                prestamos = prestamos.filter(PrestamoModel.id_usuario == value)
            elif key == "id_prestamo":
                prestamos = prestamos.filter(PrestamoModel.id_prestamo == value)
            elif key == "id_libro":
                prestamos = prestamos.filter(PrestamoModel.id_libros == value)
            elif key == "fecha_de_entrega":
                if value.startswith('-'):
                    month = value.lstrip('-')
                    prestamos = prestamos.filter(
                        extract('month', PrestamoModel.fecha_de_entrega) == int(month)
                    )
                elif len(value) == 2:
                    prestamos = prestamos.filter(
                        extract('day', PrestamoModel.fecha_de_entrega) == int(value)
                    )
                elif len(value) == 4:
                    prestamos = prestamos.filter(
                        extract('year', PrestamoModel.fecha_de_entrega) == int(value)
                    )
                else:
                    prestamos = prestamos.filter(PrestamoModel.fecha_de_entrega.like("%"+value+"%"))
            elif key == "fecha_de_vencimiento":
                if value.startswith('-'):
                    month = value.lstrip('-')
                    prestamos = prestamos.filter(
                        extract('month', PrestamoModel.fecha_de_vencimiento) == int(month)
                    )
                elif len(value) == 2:
                    prestamos = prestamos.filter(
                        extract('day', PrestamoModel.fecha_de_vencimiento) == int(value)
                    )
                elif len(value) == 4:
                    prestamos = prestamos.filter(
                        extract('year', PrestamoModel.fecha_de_vencimiento) == int(value)
                    )
                else:
                    prestamos = prestamos.filter(PrestamoModel.fecha_de_vencimiento.like("%"+value+"%"))
            elif key == "estado":
                prestamos = prestamos.filter(PrestamoModel.estado == value)

        if request.args.get('sortby_id_prestamo'):
            prestamos = prestamos.order_by(desc(PrestamoModel.id_prestamo))

        if request.args.get('sortby_id_usuario'):
            prestamos = prestamos.order_by(desc(PrestamoModel.id_usuario))

        if request.args.get('sortby_id_libro'):
            prestamos = prestamos.order_by(desc(PrestamoModel.id_libros))

        if request.args.get('sortby_fecha_de_entrega'):
            prestamos = prestamos.order_by(desc(PrestamoModel.fecha_de_entrega))
        
        if request.args.get('sortby_fecha_de_vencimiento'):
            prestamos = prestamos.order_by(desc(PrestamoModel.fecha_de_vencimiento))

        prestamos = prestamos.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'prestamos': [prestamo.to_json_complete() for prestamo in prestamos.items],
                'total de prestamos': prestamos.total,
                'paginas': prestamos.pages,
                'pagina': page
                })
    
    @roles_required(roles = ["admin", "users"])
    def post(self):
        prestamo = PrestamoModel.from_json(request.get_json())
        print(prestamo)
        try:
            db.session.add(prestamo)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return prestamo.to_json(), 201

