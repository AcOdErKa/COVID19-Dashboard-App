import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Casedata } from '../models/casedata.model';

@Injectable()
export class ChoiceService {
  constructor(private http: HttpClient) {}
  private countryURL = 'https://still-falls-89184.herokuapp.com/getAllCountry';
  private stateURL = 'https://still-falls-89184.herokuapp.com/getProvince/';
  public getCountries() {
    return this.http.get<any[]>(this.countryURL);
  }

  public getStates(stateName) {
    return this.http.get<any[]>(this.stateURL + stateName);
  }

  public getCountryData(countryName) {
    return this.http.get<Casedata[]>('https://still-falls-89184.herokuapp.com/getAllData/' + countryName);
  }

  public getCountryDataWithProvince(countryName, stateName) {
    return this.http.get<Casedata[]>('https://still-falls-89184.herokuapp.com/getAllData/' + countryName + '/' + stateName);
  }
}
