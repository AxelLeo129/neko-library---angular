import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  get(endpoint: string): Promise<any> {
    return this.http.get(environment.api_url + endpoint).toPromise();
  }
}
