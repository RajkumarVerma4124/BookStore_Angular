import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token: any;
  constructor(private httpService: HttpService) { 
    this.token = localStorage.getItem('token')
  }

  addToCart(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Cart/Add', reqData, true, header);
  }

  removeCart(cartId: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService('/Cart/Delete?cartId=' + cartId, true, header);
  }

  updateCart(cartId: any, bookQuantity: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.putService(`/Cart/Update?cartId=${cartId}&bookquantity=${bookQuantity}`, {}, true, header);
  }

  getAllCart() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Cart/GetAll', true, header)
  }
}
