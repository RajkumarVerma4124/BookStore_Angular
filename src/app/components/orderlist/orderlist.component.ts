import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orderServices/order.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  orderList: any =[];
  pipe = new DatePipe('en-US');
  orderedDate: any;
  constructor(private orderService: OrderService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrder().subscribe((response: any) => {
      console.log("Got The Cart Successfully", response);
      this.orderList = response.data;
      this.orderList.reverse();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }
}
