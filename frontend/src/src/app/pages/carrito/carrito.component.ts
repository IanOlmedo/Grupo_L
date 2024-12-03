import { Component, Input } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { PrestamosService } from '../../services/prestamos.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']  
})
export class CarritoComponent {
  @Input() var_id!: string;

  cartItems: any[] = [];
  prestamos: any[] = [];
  cantidad_prestamos: number = 0


  constructor(
    private carritoService: CarritoService,
    private prestamoService: PrestamosService,
    private usuarioService: PrestamosService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.cartItems = this.carritoService.getCartItems();
    this.var_id = this.route.snapshot.paramMap.get('id') || '';
  }

  removeFromCart(id: number): void{
  this.carritoService.removeFromCart(id);
  this.cartItems = this.carritoService.getCartItems();
  }

  clearCart():void{
    this.carritoService.clearCart();
    this.cartItems = []
  }

  checkPrestamosUser(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.prestamoService.getPrestamos({}).subscribe(
        (rta: any) => {
          this.prestamos = rta.prestamos || [];
  
          // Filtrar los préstamos del usuario con el id proporcionado y estado "no devuelto"
          const userLoans = this.prestamos.filter((prestamo: any) =>
            prestamo.usuarios.id_usuario === id && prestamo.estado === 'no devuelto'
          );
  
          // Contar cuántos préstamos cumplen con las condiciones
          const cantidad = userLoans.length;
  
          // Resolver la promesa con la cantidad de préstamos
          resolve(cantidad);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
  
  async reservar(list: any[]): Promise<void> {
    try {
      const cantidadPrestamos = await this.checkPrestamosUser(this.var_id);
      console.log(cantidadPrestamos);
  
      list.forEach((book: any) => {
        if (cantidadPrestamos < 3) {
          console.log(book);
          console.log(Number(this.var_id));
          console.log(book.id_libro);
  
          const prestamo = {
            id_usuario: Number(this.var_id),
            id_libros: book.id_libro,
            fecha_de_entrega: null,
            fecha_de_vencimiento: null,
            estado: "reservado"
          };
  
          alert('Libro reservado, vaya al local para recibirlo');
          this.prestamoService.createPrestamo(prestamo);
        } else {
          alert('Tiene el máximo de préstamos permitido');
        }
      });
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }
}
