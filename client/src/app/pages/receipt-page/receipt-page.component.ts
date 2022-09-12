import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.servie';

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css'],
})
export class ReceiptPageComponent implements OnInit {
  @ViewChild('receipt', { static: false }) el!: ElementRef;
  orderId: number;
  orderPath: string;
  href;

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.blockIfThereNoLoggedUsers(this.router);
    this.checkoutService.orderId.subscribe((id: number) => {
      this.orderId = id;
    });
  }

  backToShop() {
    this.router.navigateByUrl('shoesOnline/main/category/all');
  }

  downloadReceipt() {
    console.log(this.orderId);
    this.checkoutService.onDownloadReceipt(this.orderId);
  }
}
