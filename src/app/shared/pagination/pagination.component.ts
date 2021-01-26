import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  sizePage = 10;
  @Input() totalItem: number;
  @Output() emitPaging = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  changePaging(event) {
    this.emitPaging.emit(event);
  }
}
