from .. import db
from datetime import datetime

class Valoraciones(db.Model):
    __tablename__ = 'valoraciones'
    id_valoracion = db.Column(db.Integer, primary_key=True)
    id_libro = db.Column(db.Integer, db.ForeignKey("libro.id_libro"), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario"), nullable=False)
    valoracion = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(100), nullable=False)
    fecha_de_valoracion = db.Column(db.DateTime, nullable=False)
    # Relación uno a muchos
    usuario = db.relationship("Usuarios", back_populates="valoraciones", uselist=False, single_parent=True)
    #Relación uno a uno
    libro = db.relationship("Libro", uselist=False, back_populates="valoracion", cascade="all, delete-orphan", single_parent=True)
    
    def __repr__(self):                    
        return '<Valoraciones: %r >' % (self.valoracion)

    def to_json(self):
        valoracion_json={
            'id_valoracion':self.id_valoracion,
            'id_libro':self.id_libro,
            'id_usuario':self.id_usuario,
            'valoracion':self.valoracion,
            'comentario':str(self.comentario),
            'fecha_de_valoracion':str(self.fecha_de_valoracion.strftime("%d-%m-%Y")),
        }
        return valoracion_json

    def to_json_short(self):
            valoracion_json={
                "id_valoracion":self.id_valoracion,
                "valoracion":self.valoracion,
                "comentario":self.comentario
            }
            return valoracion_json
        
    def to_json_complete(self):
            libro = [libro.to_json() for libro in self.libro]
            usuario = [usuario.to_json() for usuario in self.usuario]
            valoracion_json={
                'id_valoracion':self.id_valoracion,
                'id_libro':self.id_libro,
                'id_usuario':self.id_usuario,
                'valoracion':self.valoracion,
                'comentario':str(self.comentario),
                'fecha_de_valoracion':str(self.fecha_de_valoracion.strftime("%d-%m-%Y")),
                'usuario':usuario,
                'libro':libro
            }
            return valoracion_json
    @staticmethod
    def from_json(valoracion_json):
        print(valoracion_json)
        for i in valoracion_json:
            print(type(i))
        id_valoracion = valoracion_json.get("id_valoracion")
        id_libro = valoracion_json.get("id_libro")
        id_usuario = valoracion_json.get("id_usuario")
        valoracion = valoracion_json.get("valoracion")
        comentario = valoracion_json.get("comentario")
        fecha_de_valoracion = datetime.strptime(valoracion_json.get('fecha_de_valoracion'), '%d-%m-%Y')
        return Valoraciones(
            id_valoracion = id_valoracion,
            id_libro = id_libro,
            id_usuario = id_usuario,
            valoracion = valoracion,
            comentario = comentario,
            fecha_de_valoracion = fecha_de_valoracion
        )