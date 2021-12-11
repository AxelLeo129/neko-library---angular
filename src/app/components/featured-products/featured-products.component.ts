import { Component, OnInit } from "@angular/core";
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
  public prodotti: Array<any> = [
    {
      dati: [],
      chiave: 'prodotti_gratuiti',
      ordinato_da: 'id',
      design: 'griglia',
      titolo: 'ARTÍCULOS DESTACADOS',
      url: 'articulos-gratis',
      campo_ricerca: 'prezzo',
      valore_ricerca: 0
    }, 
    {
      dati: [],
      chiave: 'piu_venduto',
      ordinato_da: 'vendite',
      design: 'griglia',
      titolo: 'ARTÍCULOS MÁS VENDIDOS',
      url: 'lo-mas-vendido',
      campo_ricerca: null,
      valore_ricerca: null
    },
    {
      dati: [],
      chiave: 'piu_visti',
      ordinato_da: 'visualizzazioni',
      design: 'griglia',
      titolo: 'ARTÍCULOS MÁS VISTOS',
      url: 'lo-mas-visto',
      campo_ricerca: null,
      valore_ricerca: null
    },
  ];

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.getProducts(0);
    this.getProducts(1);
    this.getProducts(2);
  }

  getProducts(tipo_prodotto: number) {
    let url = `products?order_by=${this.prodotti[tipo_prodotto]['ordinato_da']}&limit=4`;
    if(this.prodotti[tipo_prodotto]['campo_ricerca'])
      url += `&search_field=${this.prodotti[tipo_prodotto]['campo_ricerca']}&search_value=${this.prodotti[tipo_prodotto]['valore_ricerca']}`;
    this.generalService
      .get(url)
      .then((response) => {
        this.prodotti[tipo_prodotto]['dati'] = response.data;
      })
      .catch((err) => console.log(err));
  }

  changeDesign(articolo: number, design: string): void {
    this.prodotti[articolo]['design'] = design;
  }
}
