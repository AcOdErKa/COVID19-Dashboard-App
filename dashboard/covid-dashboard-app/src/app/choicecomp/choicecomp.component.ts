import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChoiceService } from './choicecomp.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-choicecomp',
  templateUrl: './choicecomp.component.html',
  styleUrls: ['./choicecomp.component.css']
})
export class ChoicecompComponent implements OnInit {
  countryForm: FormGroup;
  countries = new Array();
  states = new Array();
  constructor(private choiceService: ChoiceService) { }
  ngOnInit(): void {
    this.choiceService.getCountries().subscribe(
      data => {
        // tslint:disable-next-line: no-string-literal
        for (const d in data['countries']) {
          this.countries.push({id: d.toString(), name: data['countries'][d][1].toString()});
        }
      }
    );

    this.countryForm = new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
    });

  }

  onChangeCountry(countryName: string) {
    console.log(countryName);
    this.states = new Array();
    this.choiceService.getStates(countryName).subscribe(
      data => {
        if (data['states'].length === 1 && data['states'][0][1] === '') {
          this.states.push({id: "0", name: "No State Found"});
        } else {
          for (const s in data['states']) {
            this.states.push({id: s.toString(), name: data['states'][s][1].toString()});
          }
        }
      }
    );
  }



}
