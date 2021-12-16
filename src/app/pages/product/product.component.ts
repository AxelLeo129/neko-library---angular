import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Event, NavigationEnd, Router } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import {
  faTh,
  faList
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, OnDestroy {
  public categoria_sottocategoria_trovata: boolean = false;
  public scaricando: boolean = true;
  private sottoscrizione_rotta: Subscription;
  public design: string = 'griglia';
  public faTh = faTh;
  public faList = faList;
  public percorso_attuale: string;
  public prodotto: any = {
    dati: [],
    design: "griglia",
    opzioni: [
      {valore: 'piu-recente', vista: 'Más recientes'},
      {valore: 'piu-vecchio', vista: 'Más antiguos'}
    ],
    ordinato_da: 'piu-recente'
  }
  public link: Array<any> = [];
  private url: string;
  private pagina_actuale: number;
  private ultima_pagina: number;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private general_service: GeneralService
  ) {}

  ngOnInit(): void {
    this.scaricando = true;
    this.spinner.show();
    this.getRoute();
    this.sottoscrizione_rotta = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.scaricando = true;
        this.spinner.show();
        this.getRoute();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sottoscrizione_rotta) this.sottoscrizione_rotta.unsubscribe();
  }
  
  changeDesign(design: string): void {
    this.design = design;
  }

  finishLoader() {
    this.spinner.hide();
    this.scaricando = false;
  }

  async getRoute() {
    const rotta_categoria: string = this.route.snapshot.params.categoria;
    const rotta_sottocategoria: string =
      this.route.snapshot.params.sottocategoria;
    if (rotta_categoria) {
      this.percorso_attuale = rotta_categoria.replace(/-/g, ' ');
      if (rotta_categoria == "articulos-gratis") {
        this.url = `products?order_by=id&limit=12&search_field=prezzo&search_value=0`;
        this.getProducts();
      } 
      else if (rotta_categoria == "lo-mas-vendido") {
        this.url = `products?order_by=vendite&limit=12`;
        this.getProducts();
      }
      else if (rotta_categoria == "lo-mas-visto") {
        this.url = `products?order_by=visualizzazioni&limit=12`;
        this.getProducts();
      }
      else {
        const categoria_risposta = await this.general_service.get(
          "verificar-categoria/" + rotta_categoria
        );
        if (categoria_risposta.mensaje != "No encontrada") {
          if (rotta_sottocategoria) {
            this.percorso_attuale = rotta_sottocategoria.replace(/-/g, ' ');
            const sottocategoria_risposta = await this.general_service.get(
              "verificar-subcategoria/" + rotta_sottocategoria
            );
            if (sottocategoria_risposta.mensaje == "No encontrada") {
              this.categoria_sottocategoria_trovata = false;
              this.finishLoader();
            } else {
              this.url = `products?order_by=id&limit=12&search_field=sottocategoria_id&search_value=${sottocategoria_risposta.id}`;
              this.getProducts();
            }
          } else {
            this.url = `products?order_by=id&limit=12&search_field=categoria_id&search_value=${categoria_risposta.id}`;
            this.getProducts();
          }
        } else this.finishLoader();
      }
    }
  }

  async getProducts(pagina: string = "1") {
    this.general_service
      .get(this.url + `&page=${pagina}`).then((response) => {
        console.log(response);
        this.pagina_actuale = response.current_page;
        this.ultima_pagina = response.last_page;
        this.link = response.links;
        this.link[0].label = "Anterior";
        this.link[this.link.length - 1].label = "Siguiente";
        this.prodotto.dati = response.data;
        this.categoria_sottocategoria_trovata = true;
        this.finishLoader();
      })
      .catch((err) => {
        console.log(err);
        this.finishLoader();
      });
  }

  changePage(label: string) {
    if((label == 'Anterior' && this.pagina_actuale == 1) || (label == 'Siguiente' && this.pagina_actuale == this.ultima_pagina) || label == '...') return
    if(label == 'Anterior') label = (this.pagina_actuale - 1).toString();
    if(label == 'Siguiente') label = (this.pagina_actuale + 1).toString();
    this.getProducts(label);
  }
}
