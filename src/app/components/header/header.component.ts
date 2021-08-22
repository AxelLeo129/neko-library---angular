import { Component, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  public brandIcons = brandIcons;
  public faBars = faBars;
  public faSearch = faSearch;
  public faShoppingCart = faShoppingCart;
  public redes_sociales: Array<any>;
  public color_fondo: string;
  public color_texto: string;
  public barra_superior: string;
  public texto_superior: string;
  public imagen_logo: string;

  public categorias: Array<any>;

  @HostListener('window:resize') doSomething() {
    this.categorias_normal = window.innerWidth <= 767 ? false : true;
  }
  public categorias_activas = false;
  public categorias_normal = window.innerWidth <= 767 ? false : true;

  constructor(private general_service: GeneralService, private router: Router) { }

  ngAfterViewInit(): void {
    this.getTemplateStructure();
    this.getCategories();
  }

  getTemplateStructure() {
    this.general_service.get('template').then((response: any) => {
      this.redes_sociales = JSON.parse(response.redes_sociales);
      this.color_fondo = response.color_fondo;
      this.color_texto = response.color_texto;
      this.barra_superior = response.barra_superior;
      this.texto_superior = response.texto_superior;
      this.imagen_logo = response.logo;
    }).catch(err => console.log(err));
  }

  getCategories() {
    this.general_service.get('categorias-subcategorias').then((response: any) => {
      this.categorias = response;
    }).catch(err => console.log(err));
  }

  showCategorias() {
    this.categorias_activas = !this.categorias_activas;
  }

  searchByCategorie(categoria: string) {
    this.router.navigate([categoria]);
  }

}
