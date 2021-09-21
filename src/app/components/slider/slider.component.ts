import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faChevronRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { toggle } from 'slidetoggle';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  public imagen_fondo: string = "https://firebasestorage.googleapis.com/v0/b/neko-library.appspot.com/o/slide%2Fback_default.jpg?alt=media&token=d12ba168-bcad-40f6-b51d-71dbac93fd48";
  public imagen_fondo1: string = "https://firebasestorage.googleapis.com/v0/b/neko-library.appspot.com/o/slide%2Ffondo2.jpg?alt=media&token=a03912a3-d37c-4106-8eda-833e69ce9bc9";
  public imagen_fondo2: string = "https://firebasestorage.googleapis.com/v0/b/neko-library.appspot.com/o/slide%2Ffondo3.jpg?alt=media&token=15b1a7ab-466a-4f6a-ac57-4a0babeb63e1";
  public faChevronRight = faChevronRight;
  public faAngle = faAngleUp;

  images = [
    "https://firebasestorage.googleapis.com/v0/b/neko-library.appspot.com/o/slide%2Fcalzado.png?alt=media&token=9b5fa55f-a4f7-4140-9a1e-4018600a51e4",
    "https://firebasestorage.googleapis.com/v0/b/neko-library.appspot.com/o/slide%2Fcurso.png?alt=media&token=106af9e6-fcee-4b1e-832d-856ac449fa3f",
    "https://firebasestorage.googleapis.com/v0/b/neko-library.appspot.com/o/slide%2Fiphone.png?alt=media&token=2c992069-ac3b-417e-91b9-e0261af13161"
  ];

  constructor() { }

  ngOnInit(): void {
  }

  hideSlide(): void {
    const element = document.getElementById('cursore');
    this.faAngle = this.faAngle == faAngleDown ? faAngleUp : faAngleDown;
    toggle(element, {
      miliseconds: 300,
      transitionFunction: 'ease-in',
    });
  }

}
