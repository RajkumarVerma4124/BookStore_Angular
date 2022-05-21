import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = environment.baseurl;
  constructor(private httpClient: HttpClient) { }

  postService(url: string, reqData: any, token: boolean = false, httpOptions: any) {
    return this.httpClient.post(this.baseurl + url, reqData, token && httpOptions);
  }

  patchService(url: string, reqData: any, token: boolean = false, httpOptions: any) {
    return this.httpClient.patch(this.baseurl + url, reqData, token && httpOptions);
  }

  getService(url: string, token: boolean = false, httpOptions: any) {
    return this.httpClient.get(this.baseurl + url, token && httpOptions);
  }

  putService(url: string, reqData: any, token: boolean = false, httpOptions: any) {
    return this.httpClient.put(this.baseurl + url, reqData, token && httpOptions);
  }

  deleteService(url: string, token: boolean = false, httpOptions: any) {
    return this.httpClient.delete(this.baseurl + url, token && httpOptions);
  }
}
