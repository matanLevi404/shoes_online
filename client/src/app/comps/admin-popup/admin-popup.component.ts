import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css'],
})
export class AdminPopupComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  @Input() productDetails;
  @Input() availableSizes;
  @Input() initialPrice;

  constructor(
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.firstForm = new FormGroup({
      name: new FormControl(this.productDetails.name, [Validators.required]),
      gender: new FormControl(this.productDetails.gender, [
        Validators.required,
      ]),
      brand: new FormControl(null, [Validators.required]),
      minSize: new FormControl(this.availableSizes[0], [Validators.required]),
      maxSize: new FormControl(
        this.availableSizes[this.availableSizes.length - 1],
        [Validators.required]
      ),
    });

    this.secondForm = new FormGroup({
      color: new FormControl(this.productDetails.color, [Validators.required]),
      price: new FormControl(this.productDetails.price, [Validators.required]),
      on_sale: new FormControl(
        this.productDetails.on_sale == 1 ? 'YES' : 'NO',
        [Validators.required]
      ),
      image: new FormControl(this.productDetails.image, [Validators.required]),
    });
  }

  editProduct() {
    const editBody = {
      product_id: this.productDetails.id,
      name: this.firstForm.value.name,
      gender: this.firstForm.value.gender,
      size: `${this.firstForm.value.minSize}-${this.firstForm.value.maxSize}`,
      color: this.secondForm.value.color,
      price: this.secondForm.value.price,
      on_sale: this.secondForm.value.on_sale == 'YES' ? 1 : 0,
      image: this.secondForm.value.image,
    };

    console.log(editBody);

    this.adminService.onEditProduct(editBody).then((data) => {
      if (data.err) {
        this._snackBar.open(data.err, '', { duration: 2000 });
      } else {
        this._snackBar.open(data.msg, '', { duration: 2000 });
      }
    });
  }
}
