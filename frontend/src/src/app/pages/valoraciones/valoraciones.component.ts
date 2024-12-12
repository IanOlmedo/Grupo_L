import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ValoracionesService } from '../../services/valoraciones.service';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent {
  var_id!: string;

  searchQuery = ''

  arrayValoraciones: any[] = []
  currentPage: number = 1 
  totalPages: number = 1 
  itemsPerPage: number = 3
  canSubmit: boolean = false 

  valoracion:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private valoracionesService: ValoracionesService,
  ) {}

  ngOnInit() {
    this.var_id = this.route.snapshot.paramMap.get('id') || '';

    this.valoracion = {
      comentario: '',
      fecha_de_valoracion: new Date().toISOString(),
      id_libro: Number(this.var_id),
      id_usuario: Number(localStorage.getItem("user_id")),
      valoracion: 1,
    };

    this.fetchValoraciones();
  }

  getStars(calificacion: number): Array<number> {
    console.log('getStars called with calificacion: ', calificacion);
    return Array(5).fill(0).map((x, i) => i);
  }

  fetchValoraciones(page: number = 1): void {
    const params = {
      page: page.toString(),
      per_page: this.itemsPerPage.toString(),
      id_libro: Number(this.var_id)
    }
    this.valoracionesService.getValoraciones(params).subscribe((rta: any) => {
      console.log('valoracion api: ', rta);
      this.arrayValoraciones = rta.valoraciones || [];
      console.log('this.arrayValoraciones: ', this.arrayValoraciones);
      this.currentPage = rta.pagina;
      this.totalPages = rta.paginas;
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchValoraciones(page);
    }
  }

  get isRole() {
    return localStorage.getItem('user_role');
  }

  get isUser() {
    return localStorage.getItem('user_role') === 'users';
  }

  get isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
  }


  onSubmit() {
    this.valoracionesService.checkValoracion(this.valoracion.id_libro).subscribe(response => {
      if (response.message === 'El usuario puede dejar una valoración.') {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
        const year = now.getFullYear();
        this.valoracion.fecha_de_valoracion = `${day}-${month}-${year}`;
        this.valoracionesService.createValoracion(this.valoracion).subscribe(response => {
          alert('Se creo la valoración con éxito');
          console.log('Valoración enviada:', response);
          document.getElementById('btn-close')?.click();
          this.valoracion = {
            comentario: '',
            fecha_de_valoracion: new Date().toISOString(),
            id_libro: this.valoracion.id_libro,
            id_usuario: this.valoracion.id_usuario,
            valoracion: 1,
          };
          this.canSubmit = false; // Reset the submit status
        });
        this.fetchValoraciones();
      }
    }, error => {
      if (error.message === 'El usuario no ha hecho un préstamo de este libro.') {
        alert('No puedes dejar una valoración porque no tuviste un préstamo de este libro.');
      } else if (error.message === 'El usuario ya ha dejado una valoración para este libro.') {
        alert('No puedes dejar una valoración porque ya has dejado una valoración para este libro.');
      }
    });
  }
}


