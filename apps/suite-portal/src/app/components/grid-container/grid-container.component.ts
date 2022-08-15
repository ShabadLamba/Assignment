import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sp-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.css'],
})
export class GridContainerComponent implements OnInit {
  @Input() title: string;
  @Input() rowHeight = '2:1';
  @Input() col = '1';

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }
}
