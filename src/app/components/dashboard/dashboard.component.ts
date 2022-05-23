import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataServices/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchActive: boolean = false;
  searchTerm: string = "";
  fullName: any = "";
  email: any = "";
  searchBarActive: boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fullName = localStorage.getItem("FullName")
    this.email = localStorage.getItem("Email")
  
  }

  recieveSearchNote(noteString: any) {
    console.log(noteString.target.value);
    this.searchTerm = noteString.target.value;
    this.dataService.SendData(this.searchTerm);
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

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("FullName");
    localStorage.removeItem("MobileNo");
    localStorage.removeItem("Email");
    localStorage.clear();
    // this.router.navigateByUrl('/login');
    window.location.reload();
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
