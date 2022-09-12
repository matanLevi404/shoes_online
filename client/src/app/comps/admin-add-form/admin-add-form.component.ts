import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-add-form',
  templateUrl: './admin-add-form.component.html',
  styleUrls: ['./admin-add-form.component.css'],
})
export class AdminAddFormComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.blockIfThereNoLoggedUsers(this.router).then((data) => {
      if (!data.isAdmin) {
        this.router.navigateByUrl('/');
      }
    });
    this.firstForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      minSize: new FormControl('', [Validators.required]),
      maxSize: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });

    this.secondForm = new FormGroup({
      color: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      on_sale: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  addProductToStore() {
    const addProductBody = {
      name: this.firstForm.value.name,
      category_id: parseInt(this.firstForm.value.category_id),
      brand: this.firstForm.value.brand,
      size: `${this.firstForm.value.minSize}-${this.firstForm.value.maxSize}`,
      image: this.firstForm.value.image,
      color: this.secondForm.value.color,
      price: this.secondForm.value.price,
      on_sale: this.secondForm.value.on_sale == 'YES' ? 1 : 0,
      gender: this.secondForm.value.gender,
    };
    console.log(addProductBody);
    this.adminService.onAddProductToStore(addProductBody).then((data) => {
      if (data.err) {
        this._snackBar.open(data.err, '', { duration: 2000 });
      } else {
        this._snackBar.open(data.msg, '', { duration: 2000 });
      }
    });
  }

  backToStore() {
    this.router.navigateByUrl('shoesOnline/main/category/all');
  }
}
