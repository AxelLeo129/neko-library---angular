import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  get(): Promise<any> {
    return this.http.get(environment.api_url + 'template').toPromise();
  }

}
