import { Component, OnInit, HostListener } from '@angular/core';
import { faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public faFacebook = faFacebook;
  public faYoutube = faYoutube;
  public faTwitter = faTwitter;
  public faInstagram = faInstagram;
  public faBars = faBars;
  public faSearch = faSearch;
  public faShoppingCart = faShoppingCart;

  @HostListener('window:resize') doSomething() {
    this.categorias_normal = window.innerWidth <= 767 ? false : true;
  }
  public categorias_activas = false;
  public categorias_normal = window.innerWidth <= 767 ? false : true;

  constructor() { }

  ngOnInit(): void {
  }

  showCategorias() {
    this.categorias_activas = !this.categorias_activas;
  }

}
