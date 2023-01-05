import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() showSidebar = new EventEmitter<boolean>();
  public status: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  showSide(): void {
    this.status = !this.status;
    this.event(this.status);
  }

  event( show: boolean ): void {
    this.showSidebar.emit(show);
  }

}
