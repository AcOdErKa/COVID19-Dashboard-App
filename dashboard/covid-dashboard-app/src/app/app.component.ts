import { Component, OnInit } from '@angular/core';
import { ChoiceService } from './choicecomp/choicecomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  updateTime: string;
  constructor(private choiceService: ChoiceService) { }
  ngOnInit(): void {
    this.choiceService.getLastUpdateTime().subscribe(
      data => {
        this.updateTime = data['message'];
      }
    );
  }
}
