import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class CheckoutService {
  checkoutInfo = new Subject();
  orderId = new Subject();

  async placeOrder(
    city: string,
    street: string,
    arrivalDate: string,
    digits: number
  ) {
    const checkoutBody = { city, street, arrivalDate, digits };
    const res = await fetch('http://localhost:1000/shoesOnline/main/checkout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkoutBody),
      credentials: 'include',
    });

    const data = await res.json();
    this.checkoutInfo.next(data);
    console.log(data.checkoutInfo.orderId);
    this.orderId.next(data.checkoutInfo.orderId);

    if (data.err) {
      console.log(data.err);
    } else {
      console.log(data);
    }
  }

  async getTakenDates() {
    const res = await fetch(
      'http://localhost:1000/shoesOnline/main/takenDates',
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    const data = await res.json();

    if (data.err) {
      console.log(data.err);
    } else {
      console.log(data);
      return data.takenDates;
    }
  }

  async onDownloadReceipt(orderId: number) {
    const res = await fetch(
      'http://localhost:1000/shoesOnline/main/download/' + orderId,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    const data = await res.blob();
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(data);
    a.download = 'myOrder.txt';

    a.click();
  }
}
