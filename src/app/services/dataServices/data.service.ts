import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('');
  recievedData = this.messageSource.asObservable();

  private bookQuantity = new BehaviorSubject('');
  recievedBookQuanitity = this.bookQuantity.asObservable();

  private removebookQuantity = new BehaviorSubject('');
  recievedremoveBookQuanitity = this.removebookQuantity.asObservable();

  constructor() { }

  SendData(message: string) {
    this.messageSource.next(message)
  }

  SendBookQuantity(bookQuantity: any) {
    this.bookQuantity.next(bookQuantity)
  }

  SendRemoveBookQuantity(bookQuantity: any) {
    this.removebookQuantity.next(bookQuantity)
  }
}
