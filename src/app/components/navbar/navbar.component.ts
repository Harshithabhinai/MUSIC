import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>();

  searchValue = '';

  onSearchChange(): void {
    this.search.emit(this.searchValue);
  }
}
