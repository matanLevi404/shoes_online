import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.servie';

export interface PeriodicElement {
  itemDescriptions: object;
  unitPrice: number;
  qty: string;
  amount: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  signatureSrc = 'assets/images/signature.png';

  displayedColumns: string[] = [
    'itemDescriptions',
    'unitPrice',
    'qty',
    'amount',
  ];
  dataSource;
  @ViewChild('invoiceBody', { static: false }) el!: ElementRef;
  checkoutInfo;

  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.blockIfThereNoLoggedUsers(this.router);
    this.checkoutService.checkoutInfo.subscribe((data) => {
      console.log(data, '--------------------');
      if (!data['checkoutInfo'].client) {
        this.router.navigateByUrl('shoesOnline/main/category/all');
        return;
      }
      this.checkoutInfo = data['checkoutInfo'];
      let modifyCheckoutInfo = [];
      for (let i = 0; i < this.checkoutInfo.cart.length; i++) {
        const tableRowProduct = {};
        const item = this.checkoutInfo.cart[i];
        tableRowProduct['itemDescriptions'] = {
          name: item.name,
          brand: item.brand,
          color: item.color,
          size: item.size,
        };
        tableRowProduct['unitPrice'] = `${item.price}.00`;
        tableRowProduct['qty'] = item.amount;
        tableRowProduct['amount'] = item.amount * item.price;
        modifyCheckoutInfo.push(tableRowProduct);
      }
      this.dataSource = new MatTableDataSource(modifyCheckoutInfo);
    });
  }

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('invoice.pdf');
      },
    });
  }

  backToShop() {
    this.router.navigateByUrl('shoesOnline/main/category/all');
  }
}
