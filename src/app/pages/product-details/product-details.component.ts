import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public prodotto_trovato: boolean = false;
  public cargando: boolean = true;
  private sottoscrizione_rotta: Subscription;

  constructor(private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private general_service: GeneralService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.spinner.show();
    this.getRoute();
    this.sottoscrizione_rotta = this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        this.cargando = true;
        this.spinner.show();
        this.getRoute();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.sottoscrizione_rotta)
      this.sottoscrizione_rotta.unsubscribe();
  }

  async getRoute() {
    const rotta_prodotto: string = this.route.snapshot.params.prodotto;
    if (rotta_prodotto) {
      const prodotto_risposta = await this.general_service.get('verificar-producto/' + rotta_prodotto);
      if (prodotto_risposta.mensaje != "No encontrado") {
        this.prodotto_trovato = true;
      }
    }
    this.spinner.hide();
    this.cargando = false;
  }

}
