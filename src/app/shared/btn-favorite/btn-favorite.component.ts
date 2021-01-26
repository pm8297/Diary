import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.css'],
})
export class BtnFavoriteComponent implements OnInit {
  @Input() show: boolean = true;
  @Input() numHeart: number;
  @Input() isFavorite: boolean;
  constructor() {}

  ngOnInit(): void {}
}
