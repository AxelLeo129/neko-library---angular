import { Component, OnInit } from '@angular/core';
import { faTh, faList, faChevronRight, faHeart, faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {

  public faTh = faTh;
  public faList = faList;
  public faChevronRight = faChevronRight;
  public faHeart = faHeart;
  public faEye = faEye;
  public faShoppingCart = faShoppingCart;
  public articoli_design = ['griglia', 'griglia', 'griglia'];

  constructor() { }

  ngOnInit(): void {
  }

  changeDesign(articolo: number, design: string): void {
    this.articoli_design[articolo] = design;
  }

}
