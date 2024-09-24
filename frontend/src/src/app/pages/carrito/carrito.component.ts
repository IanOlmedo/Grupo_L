import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']  // Asegúrate de que sea "styleUrls" en plural
})
export class CarritoComponent {
  @Input() var_rol!: string;
  @Input() var_id!: string;

  cartItems = [
    { nombre: 'Fuego y Sangre', portada: 'assets/Fuego_y_Sangre.jpeg' },
    { nombre: 'Romper el Circulo', portada: 'assets/Romper_el_Circulo.jpeg' },
    { nombre: 'Maze Runner Correr o Morir', portada: 'assets/Maze_Runner_1.jpg' },
    { nombre: 'Percy Jackson y el Ladrón del Rayo', portada: 'assets/Percy_Jackson_1.jpg' }
  ];

  // Método para eliminar el libro del carrito
  eliminarLibro(index: number) {
    this.cartItems.splice(index, 1); // Elimina el elemento de la posición indicada
  }
}
