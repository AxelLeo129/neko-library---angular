import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  @Input() animazione: string;
  @Input() aspetto: string;
  @Input() quantita: number;
  @Input() tema: any;

  constructor() { }

  ngOnInit(): void {
  }

}
