import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChoiceService } from './choicecomp.service';
import { Country } from '../models/country.model';
import { Casedata } from '../models/casedata.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

declare var ol: any;
@Component({
  selector: 'app-choicecomp',
  templateUrl: './choicecomp.component.html',
  styleUrls: ['./choicecomp.component.css']
})
export class ChoicecompComponent implements OnInit {
  countryForm: FormGroup;
  countries = new Array();
  states = new Array();
  countryName = '';
  stateName = '';
  totalCases = '';
  recoveredCases = '';
  deathCases = '';
  cases: Casedata[];

  tdates = new Array();
  tcases = new Array();
  rcases = new Array();
  dcases = new Array();

  lat = 0.0;
  lon = 0.0;
  map: any;
// Map
newMap(latitude, longitude) {
  console.log(latitude,longitude);
  this.map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: 2
    }),
  });
  this.addPoint(latitude, longitude);
  this.map.on('click', function (args) {
    var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
    console.log(lonlat);

    var lon = lonlat[0];
    var lat = lonlat[1];
    alert(`lat: ${lat} long: ${lon}`);
  });
}
addPoint(lat: number, lng: number) {
  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
      })]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "assets/my-icon.png"
      })
    })
  });
  this.map.addLayer(vectorLayer);
  }
// Map Ends

// Total Cases Chart
  public lineChartData: ChartDataSets[] = [
    { data: this.tcases, label: 'Confirmed' },
  ];
  public lineChartLabels: Label[] = this.tdates;
  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'No. of Cases'
         }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }]
   }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: '#007BFE',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // Total Cases Chart Ends

  // Recovered Chart

  public lineChartData2: ChartDataSets[] = [
    { data: this.rcases, label: 'Recovered' },
  ];
  public lineChartLabels2: Label[] = this.tdates;
  public lineChartOptions2 = {
    responsive: true,
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'No. of Recovered Cases'
         }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }]
   }
  };
  public lineChartColors2: Color[] = [
    {
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'green',
    },
  ];
  public lineChartLegend2 = false;
  public lineChartType2 = 'line';
  public lineChartPlugins2 = [];


  // Recovered Chart Ends

  // Death Chart

  public lineChartData3: ChartDataSets[] = [
    { data: this.dcases, label: 'Dead' },
  ];
  public lineChartLabels3: Label[] = this.tdates;
  public lineChartOptions3 = {
    responsive: true,
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'No. of Death Cases'
         }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }]
   }
  };
  public lineChartColors3: Color[] = [
    {
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'red',
    },
  ];
  public lineChartLegend3 = false;
  public lineChartType3 = 'line';
  public lineChartPlugins3 = [];
  // Death Chart Ends

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
    this.countryName = countryName;
    this.states = new Array();
    this.choiceService.getStates(countryName).subscribe(
      data => {
        if (data['states'].length === 1 && data['states'][0][1] === '') {
          this.states.push({id: "0", name: "No State Found - Select this to Proceed"});
        } else {
          for (const s in data['states']) {
            this.states.push({id: s.toString(), name: data['states'][s][1].toString()});
          }
        }
      }
    );
  }

  onChangeState(stateName: string) {
    if (stateName === 'No State Found - Select this to Proceed') {
      this.stateName = 'No State Found for this Country';
      this.choiceService.getCountryData(this.countryName).subscribe(
        data => {
          this.cases = data;
          this.totalCases = data[data.length - 1]['Confirmed'];
          this.recoveredCases = data[data.length - 1]['Recovered'];
          this.deathCases = data[data.length - 1]['Deaths'];
          this.lat = +data[data.length - 1]['Lat'];
          this.lon = +data[data.length - 1]['Long'];
          for(const d in data) {
            this.tdates.push(data[d]['Date']);
            this.tcases.push(data[d]['Confirmed']);
            this.rcases.push(data[d]['Recovered']);
            this.dcases.push(data[d]['Deaths']);
          }
          this.newMap(this.lat, this.lon);
        }
      );

    } else {
      this.stateName = stateName;
      this.choiceService.getCountryDataWithProvince(this.countryName, this.stateName).subscribe(
        data => {
          this.cases = data['result'];
          this.totalCases = data['result'][data['result'].length - 1]['Confirmed'];
          this.recoveredCases = data['result'][data['result'].length - 1]['Recovered'];
          this.deathCases = data['result'][data['result'].length - 1]['Deaths'];
          this.lat = +data['result'][data['result'].length - 1]['Lat'];
          this.lon = +data['result'][data['result'].length - 1]['Long'];

          for(const d in data['result']) {
            this.tdates.push(data['result'][d]['Date']);
            this.tcases.push(data['result'][d]['Confirmed']);
            this.rcases.push(data['result'][d]['Recovered']);
            this.dcases.push(data['result'][d]['Deaths']);
          }
          this.newMap(this.lat, this.lon);
        }
      );
    }
  }



}
