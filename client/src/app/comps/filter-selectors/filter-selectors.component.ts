import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-selectors',
  templateUrl: './filter-selectors.component.html',
  styleUrls: ['./filter-selectors.component.css'],
})
export class FilterSelectorsComponent implements OnInit {
  brands = new FormControl();
  sizes = new FormControl();
  colors = new FormControl();

  brandsList: string[] = [
    'Nike',
    'Adidas',
    'On',
    'New Balance',
    'Reebok',
    'Veja',
  ];
  sizesList: number[] = [
    35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 42, 43, 44,
    45, 46, 47, 48, 49,
  ];
  colorsList: string[] = ['Black', 'White', 'Gray', 'Red', 'Blue', 'yellow'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onClick() {
    console.log(this.brands.value, this.sizes.value, this.colors.value);
    // const brands = this.brands.value.join(',');
    // console.log(brands);

    let filteredPath: string = '?';

    if (!this.brands.value && !this.sizes.value && !this.colors.value) {
      console.log('Please choose filter options');
      return;
    }

    if (this.brands.value) {
      filteredPath = filteredPath + 'brand_g=' + this.brands.value.join(',');
    }

    if (this.sizes.value) {
      filteredPath = filteredPath + '&size_g=' + this.sizes.value.join(',');
    }

    if (this.colors.value) {
      filteredPath = filteredPath + '&color_g=' + this.colors.value.join(',');
    }

    console.log(filteredPath, 'from filter-selectors');

    this.router.navigate(['shoesOnline/main/category/all'], {
      queryParams: { size_g: this.sizes.value[0] },
    });
  }
}
