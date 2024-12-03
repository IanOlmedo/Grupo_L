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
    this.checkPrestamosUser(this.var_id);
  }

  removeFromCart(id: number): void{
  this.carritoService.removeFromCart(id);
  this.cartItems = this.carritoService.getCartItems();
  }

  clearCart():void{
    this.carritoService.clearCart();
    this.cartItems = []
  }

  checkPrestamosUser(id: string): void {
    this.prestamoService.getPrestamos({}).subscribe((rta: any) => {
      this.prestamos = rta.prestamos || [];

      const userLoans = this.prestamos.filter((prestamo: any) =>
        prestamo.id_usuario === Number(id) &&
        (prestamo.estado === 'no devuelto' || prestamo.estado === 'reservado')
      );

      this.cantidad_prestamos = userLoans.length;
    });
  }

  

  reservar(list: any[]): void {
    list.forEach((book: any) => {
      if (this.cantidad_prestamos < 3) {
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
        this.cantidad_prestamos = this.cantidad_prestamos + 1;
        this.prestamoService.createPrestamo(prestamo).subscribe(
          response => {
            console.log('Prestamo creado exitosamente:', response);
            alert('Libro reservado, vaya al local para recibirlo');
          },
          error => {
            console.error('Error al crear el prestamo:', error);
            alert('Hubo un error al reservar el libro. Por favor, inténtelo de nuevo más tarde.');
          }
        );
      } else {
        alert('Tiene el máximo de prestamos permitido');
      }
    });
  }
  
}

