import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public categoria_subcategoria_encontrada: boolean = false;
  public ruta_categoria: string;
  public cargando: boolean = true;
  private suscripcion_ruta: Subscription;

  constructor(private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute, private general_service: GeneralService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.spinner.show();
    this.getRoute();
    this.suscripcion_ruta = this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        this.cargando = true;
        this.spinner.show();
        this.getRoute();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.suscripcion_ruta)
      this.suscripcion_ruta.unsubscribe();
  }

  async getRoute() {
    const ruta_categoria: string = this.route.snapshot.params.categoria;
    const ruta_subcategoria: string = this.route.snapshot.params.subcategoria;
    if (ruta_categoria) {
      const categoria_respuesta = await this.general_service.get('verificar-categoria/' + ruta_categoria);
      if (categoria_respuesta.mensaje != "No encontrada") {
        this.categoria_subcategoria_encontrada = true;
        if (ruta_subcategoria) {
          const subcategoria_respuesta = await this.general_service.get('verificar-subcategoria/' + ruta_subcategoria);
          if (subcategoria_respuesta.mensaje == "No encontrada") {
            this.categoria_subcategoria_encontrada = false;
          }
        }
      }
    }
    this.spinner.hide();
    this.cargando = false;
  }

}
