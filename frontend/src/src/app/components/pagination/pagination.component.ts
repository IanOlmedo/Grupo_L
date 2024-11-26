import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage:number=1
  @Input() totalPages:number=1
  @Input() itemsPerPage:number=12
  @Input() goToPage!: (page: number) => void; // Función pasada desde el padre
}
