import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage:number=1
  @Input() totalPages:number=1
  @Input() itemsPerPage:number=12
  @Output() goToPage = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges){
    console.log('Hola')
    if (changes['totalPages']){
      console.log('Total pages changed: ', changes['totalPages'].currentValue);
    }
  }

  goToPageHandler(page:number){
    this.goToPage.emit(page);
  }
}
