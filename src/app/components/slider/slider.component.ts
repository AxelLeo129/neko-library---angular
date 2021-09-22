import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faChevronRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { toggle } from 'slidetoggle';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  public faChevronRight = faChevronRight;
  public faAngle = faAngleUp;
  public cursore: Array<any>[] = [];

  constructor(private generalService: GeneralService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getSlider();
  }

  getSlider() {
    this.generalService.get('slider').then((response) => {
      response.forEach(element => {
        element.stile_immagine = JSON.parse(element.stile_immagine);
        element.stile_testo = JSON.parse(element.stile_testo);
        element.titolo1 = JSON.parse(element.titolo1);
        element.titolo2 = JSON.parse(element.titolo2);
        element.titolo3 = JSON.parse(element.titolo3);
        element.pulsante = this.sanitizer.bypassSecurityTrustHtml(element.pulsante);
        this.cursore.push(element);
      });
    }).catch(err => console.log(err));
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
