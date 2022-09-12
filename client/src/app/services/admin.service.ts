import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AdminService {
  async onAddProductToStore(addProductBody) {
    const res = await fetch('http://localhost:1000/shoesOnline/main/admin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addProductBody),
      credentials: 'include',
    });
    const data = await res.json();

    if (data.err) {
      return data;
    } else {
      return data;
    }
  }

  async onEditProduct(editBody) {
    const res = await fetch('http://localhost:1000/shoesOnline/main/admin', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editBody),
      credentials: 'include',
    });
    const data = await res.json();

    if (data.err) {
      return data;
    } else {
      return data;
    }
  }
}
