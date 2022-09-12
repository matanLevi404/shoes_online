import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.servie';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  userCity: string;
  userStreet: string;
  displayUserInfo: boolean = false;
  takenDates: Date[];

  cart = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getTakenDates().then((data: any) => {
      this.takenDates = data.map((d) => {
        const convertedDate = new Date(d.arrivalTime);
        let day = convertedDate.getDate();
        let month = convertedDate.getMonth() + 1;
        let year = convertedDate.getFullYear();
        return new Date(`${month}/${day}/${year}`);
      });
    });
    this.authService.blockIfThereNoLoggedUsers(this.router);
    this.cartService.onGetCart().then();
    this.cartService.cart.subscribe((cart: []) => {
      this.cart = cart;
    });

    this.checkoutForm = new FormGroup({
      City: new FormControl('', [Validators.required]),
      Street: new FormControl('', [Validators.required]),
      ShoppingDate: new FormControl('', [Validators.required]),
      CreditCard: new FormControl('', [Validators.required]),
    });

    this.authService.userData.subscribe((data) => {
      this.userCity = data['city'];
      this.userStreet = data['street'];
    });
  }

  enterUserData() {
    this.checkoutForm.get('City').setValue(this.userCity);
    this.checkoutForm.get('Street').setValue(this.userStreet);
  }

  onSubmit() {
    let convertedDate = this.checkoutForm.value.ShoppingDate;
    let day = convertedDate.getDate();
    let month = convertedDate.getMonth() + 1;
    let year = convertedDate.getFullYear();

    let creditCardLength = this.checkoutForm.value.CreditCard.length;

    let lastDigits = this.checkoutForm.value.CreditCard.substring(
      creditCardLength - 4,
      creditCardLength
    );

    this.checkoutService.placeOrder(
      this.checkoutForm.value.City,
      this.checkoutForm.value.Street,
      `${year}-${month}-${day}`,
      lastDigits
    );

    this.router.navigateByUrl('shoesOnline/main/receipt');
  }

  dateFilter = (date: Date) => {
    const day = date.getDay();
    const time = date.getTime();
    return (
      day != 0 && day != 6 && !this.takenDates.find((x) => x.getTime() == time)
    );
  };
}
