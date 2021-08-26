import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit {

  public categoria_subcategoria_encontrada: boolean = false;
  public ruta_categoria: string;

  constructor(private router: Router, private route: ActivatedRoute, private general_service: GeneralService) { }

  ngAfterViewInit() {
    this.getRoute();
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        this.getRoute();
      }
    });
  }

  async getRoute() {
    const ruta_categoria: string = this.route.snapshot.params.categoria;
    const ruta_subcategoria: string = this.route.snapshot.params.subcategoria;
    if (ruta_categoria) {
      const categoria_respuesta = await this.general_service.get('verificar-categoria/' + ruta_categoria);
      if (categoria_respuesta != "No encontrada") {
        this.categoria_subcategoria_encontrada = true;
        if (ruta_categoria) {
          const subcategoria_respuesta = await this.general_service.get('verificar-subcategoria/' + ruta_subcategoria);
          if (subcategoria_respuesta == "No encontrada") {
            this.categoria_subcategoria_encontrada = false;
          }
        }
      }
    }
  }

}
