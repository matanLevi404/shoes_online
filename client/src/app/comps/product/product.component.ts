import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

interface product {
  id: number;
  name: string;
  gender: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  on_sale: number;
  image: string;
  category_id: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  sizes: FormControl = new FormControl();
  amount: FormControl = new FormControl();

  @Input() productDetails: product;

  isPopUpOpen: boolean;

  initialPrice: number;

  availableSizes = [];

  @Input() isAdmin: boolean;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initialPrice = this.productDetails.price * 1.2;

    for (
      let i = parseInt(this.productDetails.size.slice(0, 2));
      i < parseInt(this.productDetails.size.slice(3, 5)) + 0.5;
      i += 0.5
    ) {
      this.availableSizes.push(i);
    }
  }

  triggerPopUp() {
    this.isPopUpOpen = !this.isPopUpOpen;
  }

  async onClickAddToCart(amount: string, size: string) {
    let quantity = parseInt(amount);
    let intSize = parseInt(size);

    if (!quantity || !intSize) {
      this._snackBar.open('Please choose size and amount', '', {
        duration: 2000,
      });
      return;
    }

    this.triggerPopUp();

    let isAdded = await this.cartService.addToCart(
      this.productDetails.id,
      intSize,
      quantity
    );
    if (isAdded) {
      this._snackBar.open('Item added succesffully', '', { duration: 2000 });
    } else {
      this._snackBar.open('Failed to add item', '', { duration: 2000 });
    }
  }
}
