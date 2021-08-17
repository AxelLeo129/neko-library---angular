import { Component, OnInit, HostListener } from '@angular/core';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public brandIcons = brandIcons;
  public faBars = faBars;
  public faSearch = faSearch;
  public faShoppingCart = faShoppingCart;
  public redes_sociales: Array<any> = [];

  @HostListener('window:resize') doSomething() {
    this.categorias_normal = window.innerWidth <= 767 ? false : true;
  }
  public categorias_activas = false;
  public categorias_normal = window.innerWidth <= 767 ? false : true;

  constructor(private template_service: TemplateService) { }

  ngOnInit(): void {
    this.getTemplateStructure();
  }

  getTemplateStructure() {
    this.template_service.get().then((response: any) => {
      this.redes_sociales = JSON.parse(response.redes_sociales);
    }).catch(err => console.log(err));
  }

  showCategorias() {
    this.categorias_activas = !this.categorias_activas;
  }

}
