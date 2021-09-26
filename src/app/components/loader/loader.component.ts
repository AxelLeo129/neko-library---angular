import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() pantalla_completa: boolean;
  public colore_sfondo: string = "#47bac1";
  public colore_testo: string = "#ffffff";

  constructor(private general_service: GeneralService) { }

  ngOnInit(): void {
    this.getTemplateStructure();
  }

  getTemplateStructure(): void {
    this.general_service.get('template').then((response: any) => {
      this.colore_sfondo = response.colore_sfondo;
      this.colore_testo = response.colore_testo;
    }).catch(err => console.log(err));
  }

}
