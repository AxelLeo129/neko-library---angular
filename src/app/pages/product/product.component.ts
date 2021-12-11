import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Event, NavigationEnd, Router } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, OnDestroy {
  public categoria_sottocategoria_trovata: boolean = false;
  public scaricando: boolean = true;
  private sottoscrizione_rotta: Subscription;

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

  finishLoader() {
    this.spinner.hide();
    this.scaricando = false;
  }

  async getRoute() {
    const rottta_categoria: string = this.route.snapshot.params.categoria;
    const rotta_sottocategoria: string =
      this.route.snapshot.params.sottocategoria;
    if (rottta_categoria) {
      const categoria_risposta = await this.general_service.get(
        "verificar-categoria/" + rottta_categoria
      );
      if (categoria_risposta.mensaje != "No encontrada") {
        if (rotta_sottocategoria) {
          const sottocategoria_risposta = await this.general_service.get(
            "verificar-subcategoria/" + rotta_sottocategoria
          );
          if (sottocategoria_risposta.mensaje == "No encontrada") {
            this.categoria_sottocategoria_trovata = false;
            this.finishLoader();
          } else this.getProducts("categoria_id", categoria_risposta.id);
        } else this.getProducts("categoria_id", categoria_risposta.id);
      } else this.finishLoader();
    }
  }

  async getProducts(campo_ricerca: string, valore_ricerca: string) {
    this.general_service
      .get(
        `products?order_by=id&search_field=${campo_ricerca}&search_value=${valore_ricerca}&limit=12`
      )
      .then((response) => {
        console.log(response);
        this.categoria_sottocategoria_trovata = true;
        this.finishLoader();
      })
      .catch((err) => {
        console.log(err);
        this.finishLoader();
      });
  }
}
