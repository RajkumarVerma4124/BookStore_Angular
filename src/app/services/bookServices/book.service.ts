import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  token: any;

  constructor(private httpService: HttpService) { 
    this.token = localStorage.getItem('token')
  }

  getallbooks() {
    let headersOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Book/GetAll', true, headersOptions)
  }

  getbook(bookId: any) {
    let headersOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Book/Get?bookId='+bookId, true, headersOptions)
  }

  addFeedback(reqData: any) {
    console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Feedback/Add', reqData, true, header);
  }

  getAllFeedback(bookId: any){
    let headersOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Feedback/GetAll?bookId='+bookId, true, headersOptions)
  }
}
