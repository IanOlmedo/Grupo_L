from .. import db
import json 
from datetime import datetime

class Prestamo(db.Model):
    id_prestamo = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario"), nullable=False)
    id_libros = db.Column(db.Integer, db.ForeignKey("libro.id_libro"), nullable=False)
    fecha_de_entrega = db.Column(db.DateTime) 
    fecha_de_vencimiento = db.Column(db.DateTime)
    estado = db.Column(db.String(100), nullable=False)
    # Relación uno a muchos
    usuario = db.relationship("Usuarios", back_populates="prestamos", uselist=False, single_parent=True)
    # Relación uno a muchos
    libros = db.relationship("Libro", back_populates="prestamo")

    def __repr__(self):
        return '<Prestamo: %r %r >' % (self.id_usuario, self.estado)
    
    #Convertir objeto en JSON
    def to_json(self):
        prestamo_json={
            'id_prestamo':self.id_prestamo,
            'id_usuario':self.id_usuario,
            'id_libros':self.id_libros,
            'fecha_de_entrega':str(self.fecha_de_entrega.strftime("%d-%m-%Y")),
            'fecha_de_vencimiento':str(self.fecha_de_vencimiento.strftime("%d-%m-%Y")),
            'estado':str(self.estado),
        }
        return prestamo_json

    def to_json_short(self):
        prestamo_json = {
            'id_prestamo':self.id_prestamo,
            'estado':str(self.estado),
        }
        return prestamo_json

    def to_json_complete(self):
            usuarios = self.usuario.to_json()
            libro = self.libros.to_json()
            prestamo_json={
                'id_prestamo':self.id_prestamo,
                'id_usuario':self.id_usuario,
                'id_libros':self.id_libros,
                'fecha_de_entrega':str(self.fecha_de_entrega.strftime("%d-%m-%Y")),
                'fecha_de_vencimiento':str(self.fecha_de_vencimiento.strftime("%d-%m-%Y")),
                'estado':str(self.estado),
                'usuarios':usuarios,
                'libro':libro
            }
            return prestamo_json
        
    @staticmethod
    #Convertir JSON a objeto
    def from_json(prestamo_json):
        id_prestamo = prestamo_json.get('id_prestamo')
        id_usuario = prestamo_json.get('id_usuario')
        id_libros = prestamo_json.get('id_libros')
        fecha_de_entrega = prestamo_json.get('fecha_de_entrega')
        fecha_de_entrega = datetime.strptime(fecha_de_entrega, '%d-%m-%Y') if fecha_de_entrega else datetime(1, 1, 1)
        fecha_de_vencimiento = prestamo_json.get('fecha_de_vencimiento')
        fecha_de_vencimiento = datetime.strptime(fecha_de_vencimiento, '%d-%m-%Y') if fecha_de_vencimiento else datetime(1, 1, 1)
        estado = prestamo_json.get('estado')
        return Prestamo(
            id_prestamo=id_prestamo,
            id_usuario=id_usuario,
            id_libros=id_libros,
            fecha_de_entrega=fecha_de_entrega,
            fecha_de_vencimiento=fecha_de_vencimiento,
            estado=estado
        )


