import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {
  products = new Subject();
  searchValue = new Subject();

  async getProducts(category: string) {
    const res = await fetch(
      'http://localhost:1000/shoesOnline/main/category/' + category,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const data = await res.json();
    this.products.next(data.products);

    if (data.err) {
      console.log(data.err);
    } else {
      return data;
    }
  }

  async searchProducts(val: string) {
    const res = await fetch(
      'http://localhost:1000/shoesOnline/main/search/?searchValue=' + val,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const data = await res.json();

    this.products.next(data.products);

    if (data.err) {
      console.log(data.err);
    } else {
      return data;
    }
  }
}
