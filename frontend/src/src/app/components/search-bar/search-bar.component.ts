import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() buscar: Function = () => {};

  onSearch(searchQuery:string){
    this.buscar(searchQuery)
  }
}
