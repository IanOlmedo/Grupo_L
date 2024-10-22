import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent {
  @Input() var_rol!: string;
  @Input() var_id!: string;

  cartItems = [
    { usuario: 'Martin Navarro', avatar: 'assets/Martin.jpg', calificacion: 5, titulo: 'Fuego y Sangre', portada: "assets/Fuego_y_Sangre.jpeg", valoracion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat  tincidunt velit, diam molestie tortor metus dui vestibulum mollis  viverra placerat vestibulum mollis  viverra placerat'},
    { usuario: 'Ian Olmedo', avatar: 'assets/ian.jpeg', calificacion: 1, titulo: 'Fuego y Sangre', portada: "assets/Fuego_y_Sangre.jpeg", valoracion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat  tincidunt velit, diam molestie tortor metus dui vestibulum mollis  viverra placerat vestibulum mollis  viverra placerat'},
    { usuario: 'Camila Choque', avatar: 'assets/cami.jpeg', calificacion: 3, titulo: 'Fuego y Sangre', portada: "assets/Fuego_y_Sangre.jpeg", valoracion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat  tincidunt velit, diam molestie tortor metus dui vestibulum mollis  viverra placerat vestibulum mollis  viverra placerat'},
    { usuario: 'Luciano Toneatti', avatar: 'assets/luchi.jpeg', calificacion: 4, titulo: 'Fuego y Sangre', portada: "assets/Fuego_y_Sangre.jpeg", valoracion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat  tincidunt velit, diam molestie tortor metus dui vestibulum mollis  viverra placerat vestibulum mollis  viverra placerat'},
    { usuario: 'Reynier Lopez', avatar: 'assets/reynier.jpeg', calificacion: 2, titulo: 'Fuego y Sangre', portada: "assets/Fuego_y_Sangre.jpeg", valoracion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat  tincidunt velit, diam molestie tortor metus dui vestibulum mollis  viverra placerat vestibulum mollis  viverra placerat'},
  ];  

}
