import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Casedata } from '../models/casedata.model';

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

  public getCountryData(countryName) {
    return this.http.get<Casedata[]>('http://localhost:3000/getAllData/' + countryName);
  }

  public getCountryDataWithProvince(countryName, stateName) {
    return this.http.get<Casedata[]>('http://localhost:3000/getAllData/' + countryName + '/' + stateName);
  }
}
