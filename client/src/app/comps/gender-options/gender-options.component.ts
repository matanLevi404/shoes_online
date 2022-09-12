import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gender-options',
  templateUrl: './gender-options.component.html',
  styleUrls: ['./gender-options.component.css'],
})
export class GenderOptionsComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onClick() {
    this._snackBar.open('Doesnt work, only for decoration :)', '', {
      duration: 2000,
    });
  }
}
