import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { GeneralService } from 'src/app/services/general.service';
import { toggle } from 'slidetoggle';

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
  public social_networks: Array<any>;
  public colore_sfondo: string;
  public colore_nascosto: string = '#f8f9fa';
  public colore_testo: string;
  public barra_alto: string;
  public testo_alto: string;
  public immagine_logo: string;

  public categorie: Array<any>;

  @HostListener('window:resize') doSomething() {
    this.categorie_normale = window.innerWidth <= 767 ? false : true;
  }
  public categorie_normale: boolean = window.innerWidth <= 767 ? false : true;
  private categoria_visualizzata: boolean = false;

  constructor(private general_service: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.getTemplateStructure();
    this.getCategories();
  }

  getTemplateStructure(): void {
    this.general_service.get('template').then((response: any) => {
      this.social_networks = JSON.parse(response.social_networks);
      this.colore_sfondo = response.colore_sfondo;
      this.colore_testo = response.colore_testo;
      this.barra_alto = response.barra_alto;
      this.testo_alto = response.testo_alto;
      this.immagine_logo = response.logo;
    }).catch(err => console.log(err));
  }

  getCategories(): void {
    this.general_service.get('categorias-subcategorias').then((response: any) => {
      this.categorie = response;
    }).catch(err => console.log(err));
  }

  showCategorias(): void {
    this.categoria_visualizzata = !this.categoria_visualizzata;
    const element = document.getElementById('categorie');
    toggle(element, {
      miliseconds: 300,
      transitionFunction: 'ease-in',
      onAnimationStart: () => this.colore_nascosto = this.colore_sfondo,
      onAnimationEnd: () => this.colore_nascosto = !this.categoria_visualizzata ? '#f8f9fa' : this.colore_sfondo
    });
  }

  searchByCategorie(categoria: string): void {
    this.router.navigate([categoria]);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

}
