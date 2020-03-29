import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChoiceService {
  constructor(private http: HttpClient) {}
  private countryURL = 'http://localhost:3000/getAllCountry';
  private stateURL = 'http://localhost:3000/getProvince/';
  public getCountries() {
    return this.http.get<any[]>(this.countryURL);
  }

  public getStates(stateName) {
    return this.http.get<any[]>(this.stateURL + stateName);
  }
}
