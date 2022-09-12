import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CartService {
  cart = new Subject();
  sumPrice = new Subject();
  isCartDisplayed = new Subject();

  async onGetCart() {
    const res = await fetch('http://localhost:1000/shoesOnline/main/cart', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    this.cart.next(data.userCart);
    this.sumPrice.next(data.sumPrice);

    if (data.err) {
      console.log(data.err);
    } else {
      return data;
    }
  }

  async addToCart(productId: number, size: number, quantity: number) {
    let requestBody = { product_id: productId, size, amount: quantity };
    const response = await fetch('http://localhost:1000/shoesOnline/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    });

    const data = await response.json();

    console.log(data);
    if (data.err) {
      console.log(data.err);
      return false;
    } else {
      await this.onGetCart();
      return true;
    }
  }

  async removeFromCart(product_id: number, size: number) {
    let requestBody = { product_id, size };
    const res = await fetch('http://localhost:1000/shoesOnline/main/item', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    });

    const data = await res.json();

    console.log(data);
    if (data.err) {
      console.log(data.err);
      return false;
    } else {
      await this.onGetCart();
      return true;
    }
  }

  async onEmptyTheCart() {
    const res = await fetch('http://localhost:1000/shoesOnline/main/all', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();

    console.log(data);
    if (data.err) {
      console.log(data.err);
      return false;
    } else {
      await this.onGetCart();
      return true;
    }
  }
}
