import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-table',
  templateUrl: './checkout-table.component.html',
  styleUrls: ['./checkout-table.component.css'],
})
export class CheckoutTableComponent implements OnInit {
  @Input() cartTable;
  userFilterText: string;
  subTotal: number;
  cartDisplayedColumns: string[] = [
    'img',
    'name',
    'brand',
    'gender',
    'color',
    'size',
    'amount',
    'price',
  ];

  dataSource = new MatTableDataSource([]);

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((data: []) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cartService.sumPrice.subscribe((sum: number) => {
      this.subTotal = sum;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.userFilterText = filterValue;
  }

  backToShop() {
    this.router.navigateByUrl('shoesOnline/main/category/all');
  }
}
