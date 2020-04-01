import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Casedata } from '../models/casedata.model';
import { Agegroup } from '../models/agegroup.model';
import { Gender } from '../models/gender.model';

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

  public getDeathRateByAge() {
    return this.http.get<Agegroup[]>('https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateByAge');
  }

  public getDeathRateBySex() {
    return this.http.get<Gender[]>('https://covid19-server.chrismichael.now.sh/api/v1/FatalityRateBySex');
  }

  public getWorldData() {
    return this.http.get<any[]>('https://covid19-server.chrismichael.now.sh/api/v1/AllReports');
  }
}
