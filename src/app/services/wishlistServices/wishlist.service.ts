import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token: any;

  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token')
  }

  addWishlist(bookId: any) {
    console.log(bookId)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('/Wishlist/Add?bookId='+bookId, {}, true, header);
  }

  removeWishlist(wishlistId: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService('/Wishlist/Delete?wishlistId='+wishlistId, true, header)
  }
  getAllWishlist() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('/Wishlist/GetAll', true, header)
  }
}
