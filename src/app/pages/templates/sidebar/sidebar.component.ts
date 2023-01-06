import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() show = false;
  @Output() showSidebar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  event( show: boolean ): void {
    this.showSidebar.emit(show);
  }



}
