import { Component, OnInit } from '@angular/core';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {

  public faTh = faTh;
  public faList = faList;

  constructor() { }

  ngOnInit(): void {
  }

}
