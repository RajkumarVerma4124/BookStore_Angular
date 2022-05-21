import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService) { }

  adminlogin(reqData: any) {
    console.log(reqData)
    let header = {
      header: new HttpHeaders({
        'Content-type': 'application/json',
      })
    }
    return this.httpService.postService('/Admin/Login', reqData, false, header);
  }
}
