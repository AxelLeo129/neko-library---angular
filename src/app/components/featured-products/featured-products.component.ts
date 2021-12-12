import { Component, Input, OnInit } from "@angular/core";
import {
  faTh,
  faList,
  faChevronRight,
  faHeart,
  faEye,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-featured-products",
  templateUrl: "./featured-products.component.html",
  styleUrls: ["./featured-products.component.scss"],
})
export class FeaturedProductsComponent implements OnInit {
  public faTh = faTh;
  public faList = faList;
  public faChevronRight = faChevronRight;
  public faHeart = faHeart;
  public faEye = faEye;
  public faShoppingCart = faShoppingCart;
  @Input('prodotto') prodotto: any;

  constructor() {}

  ngOnInit(): void {
    
  }

  changeDesign(design: string): void {
    this.prodotto['design'] = design;
  }
}
