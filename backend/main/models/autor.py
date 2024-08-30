from .. import db

libros_autores = db.Table("libros_autores",
    db.Column("id_libro",db.Integer,db.ForeignKey("libro.id_libro"),primary_key=True),
    db.Column("id_autor",db.Integer,db.ForeignKey("autor.id_autor"),primary_key=True)
    )

class Autor(db.Model):
    id_autor = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    nacionalidad = db.Column(db.String(100), nullable=False)
    # Relación muchos a muchos (tabla intermedia)
    libro = db.relationship('Libro' , secondary = 'libros_autores', back_populates = 'autor')

    def __repr__(self):                    
        return '<Autor: %r >' % (self.nombre_completo)    
    
    def to_json(self):
        autor_json={
            'id_autor':self.id_autor,
            'nombre_completo':str(self.nombre_completo),
            'nacionalidad':str(self.nacionalidad),
        }
        return autor_json

    def from_json(autor_json):
        id_autor = autor_json.get('id_autor')
        nombre_completo = autor_json.get('nombre_completo')
        nacionalidad = autor_json.get('nacionalidad')
        return Autor(id_autor = id_autor,
                    nombre_completo = nombre_completo,
                    nacionalidad = nacionalidad,
                    )