import { Component, Input } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { PrestamosService } from '../../services/prestamos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']  
})
export class CarritoComponent {
  @Input() var_id!: string;

  cartItems: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private prestamoService: PrestamosService,
    private usuarioService: PrestamosService,
  ) {}

  ngOnInit(): void{
    this.cartItems = this.carritoService.getCartItems();
  }

  removeFromCart(id: number): void{
  this.carritoService.removeFromCart(id);
  this.cartItems = this.carritoService.getCartItems();
  }

  clearCart():void{
    this.carritoService.clearCart();
    this.cartItems = []
  }

  reservar(prestamo: any): void{
    this.prestamoService.createPrestamo(prestamo);
    alert('Libro reservado, vaya al local para recibirlo')
  }
}
