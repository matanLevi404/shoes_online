import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  userData = new Subject();
  isAdmin = new Subject();

  async blockIfThereNoLoggedUsers(router: Router) {
    const res = await fetch('http://localhost:1000/shoesOnline/', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();

    if (data.err) {
      console.log(data.err);
      router.navigateByUrl('/');
      return data;
    } else {
      return data;
    }
  }

  async checkIfUserHasSession() {
    const res = await fetch('http://localhost:1000/shoesOnline/', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    this.userData.next(data);
    this.isAdmin.next(data.isAdmin);

    if (data.err) {
      return data;
    } else {
      return data;
    }
  }

  async onLogin(username: string, password: string) {
    const res = await fetch('http://localhost:1000/shoesOnline/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    const data = await res.json();
    this.isAdmin.next(data.isAdmin);

    if (data.err) {
      console.log(data.err);
      return false;
    } else {
      return true;
    }
  }

  async onRegister(registerBody) {
    console.log(registerBody);
    const res = await fetch('http://localhost:1000/shoesOnline/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerBody),
    });

    const data = await res.json();

    if (data.err) {
      console.log(data.err);
    } else {
      this.onLogin(registerBody.username, registerBody.password);
    }
  }

  async onLogout(router: Router) {
    const res = await fetch('http://localhost:1000/shoesOnline/', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();
    if (data.err) {
      console.log(data.err);
    } else {
      console.log(data.msg);
      router.navigateByUrl('/');
    }
  }
}
