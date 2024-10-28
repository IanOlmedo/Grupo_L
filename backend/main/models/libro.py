from .. import db
from datetime import datetime

class Libro(db.Model):
    id_libro = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    editorial = db.Column(db.String(100), nullable=False)
    anio_de_publicacion = db.Column(db.DateTime, nullable=False)
    descripcion = db.Column(db.String(100), nullable=False)
    imagen = db.Column(db.String(100), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    # Relación uno a muchos
    prestamo = db.relationship("Prestamo", back_populates="libros",cascade="all, delete-orphan", uselist=False, single_parent=True)
    #Relación uno a uno
    valoracion = db.relationship("Valoraciones", back_populates="libro", cascade="all, delete-orphan", single_parent=True)
    # Relación muchos a muchos (tabla intermedia)
    autor = db.relationship('Autor' , secondary = 'libros_autores', back_populates = 'libro')

    def __repr__(self):                    
        return '<Libro: %r >' % (self.titulo)
    
    def to_json(self):
        libro_json={
            'id_libro':self.id_libro,
            'titulo':str(self.titulo),
            'genero':str(self.genero),
            'editorial':str(self.editorial),
            'anio_de_publicacion':str(self.anio_de_publicacion.strftime("%d-%m-%Y")),
            'descripcion':str(self.descripcion),
            'imagen':str(self.imagen),
            'stock':self.stock
        }
        return libro_json
    
    def to_json_short(self):
        libro_json = {
            'id_libro':self.id_libro,
            'titulo':str(self.titulo),
            'genero':str(self.genero),
            'editorial':str(self.editorial),
            'anio_de_publicacion':self.anio_de_publicacion,
            'descripcion':str(self.descripcion),
            'stock':self.stock,
            'imagen':str(self.imagen),
        }
        return libro_json

    def to_json_complete(self):
            autor = [autor.to_json() for autor in self.autor]
            libro_json={
                'id_libro':self.id_libro,
                'titulo':str(self.titulo),
                'genero':str(self.genero),
                'editorial':str(self.editorial),
                'anio_de_publicacion':str(self.anio_de_publicacion.strftime("%d-%m-%Y")),
                'descripcion':str(self.descripcion),
                'stock':self.stock,
                'imagen':str(self.imagen),
                'autor':autor
            }
            return libro_json
        
    def from_json(libro_json):
        id_libro = libro_json.get('id_libro')
        titulo = libro_json.get('titulo')
        genero = libro_json.get('genero')
        editorial = libro_json.get('editorial')
        anio_de_publicacion = datetime.strptime(libro_json.get('anio_de_publicacion'), '%d-%m-%Y')
        descripcion = libro_json.get('descripcion')
        imagen = libro_json.get('imagen')
        stock = libro_json.get('stock')
        return Libro(id_libro=id_libro,
                    titulo=titulo,
                    genero=genero,
                    editorial=editorial,
                    anio_de_publicacion=anio_de_publicacion,
                    descripcion=descripcion,
                    imagen=imagen,
                    stock=stock,
                    )

