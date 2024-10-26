import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  onSearchQueryChange() {
    this.searchQueryChange.emit(this.searchQuery);
  }
  constructor() {
  }


}
