import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchActive: boolean = false;
  searchTerm: string = "";
  searchBarActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  recieveSearchNote(noteString: any) {
    console.log(noteString.target.value);
    this.searchTerm = noteString.target.value;
    this.searchActive = true;
    if (this.searchTerm.length == 0) {
      this.clickCross();
    }
  }

  clickCross() {
    this.searchTerm = "";
    this.searchActive = false;
  }

  setSearchActive() {
    this.searchBarActive = !this.searchBarActive;
  }

  setSearchDeactive() {
    this.searchBarActive = false;
  }

}
