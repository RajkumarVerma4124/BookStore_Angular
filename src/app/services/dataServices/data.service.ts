import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('');
  recievedData = this.messageSource.asObservable();

  private bookIdSource = new BehaviorSubject('');
  recievedBookIdData = this.bookIdSource.asObservable();

  constructor() { }

  SendData(message: string) {
    this.messageSource.next(message)
  }

  SendBookId(bookId: any) {
    this.bookIdSource.next(bookId)
  }
}
