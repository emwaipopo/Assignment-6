import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        let fetchedSatellites: Satellite[] = data.satellites;
         
        for(let i: number = 0; i < fetchedSatellites.length; i++){
          this.sourceList.push(fetchedSatellites[i]);
        }
        // make a copy of the sourceList to be shown to the user
        this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));
 }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i: number = 0; i < this.sourceList.length; i++) {
      let name: string = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }
    this.displayList = matchingSatellites;
  }
}

