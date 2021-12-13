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
      if (rotta_categoria == "articulos-gratis") this.getProducts('id', "12", "prezzo", "0"); 
      else if (rotta_categoria == "lo-mas-vendido") this.getProducts('vendite', "12");
      else if (rotta_categoria == "lo-mas-visto") this.getProducts('visualizzazioni', "12");
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
            } else this.getProducts("id", "12", "categoria_id", categoria_risposta.id);
          } else this.getProducts("id", "12", "categoria_id", categoria_risposta.id);
        } else this.finishLoader();
      }
    }
  }

  async getProducts(ordinato_da: string, limite: string, campo_ricerca: string = null, valore_ricerca: string = null) {
    let url = `products?order_by=${ordinato_da}&limit=${limite}`;
    if(campo_ricerca)
      url += `&search_field=${campo_ricerca}&search_value=${valore_ricerca}`;
    this.general_service
      .get(url).then((response) => {
        this.prodotto.dati = response.data;
        this.categoria_sottocategoria_trovata = true;
        this.finishLoader();
      })
      .catch((err) => {
        console.log(err);
        this.finishLoader();
      });
  }
}
