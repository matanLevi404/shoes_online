import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

function passwordConfarmation(input: FormControl) {
  if (!input.root['controls']) {
    return null;
  }

  const valuesDoNOtMatch =
    input.root['controls'].confirmPassword.value ===
    input.root['controls'].password.value;

  console.log(valuesDoNOtMatch);
  return valuesDoNOtMatch ? null : { valuesDoNOtMatch: true };
}

async function checkUserId(input: FormControl) {
  if (!input.root['controls']) {
    return null;
  }
  const userID = input.root['controls'].ID.value;
  if (userID.length < 9) {
    return null;
  }
  const res = await fetch('http://localhost:1000/shoesOnline/checkId', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userID }),
    credentials: 'include',
  });
  const data = await res.json();

  if (data.err) {
    console.log(data.err);
  } else {
    console.log(data.msg);
  }
  const isUserNotIDValid = data.msg;
  return isUserNotIDValid ? null : { isUserNotIDValid: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  welcomeSrc = 'assets/images/welcome.jpg';
  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      ID: ['', [Validators.minLength(9), Validators.required], [checkUserId]],
      username: ['', [Validators.minLength(5), Validators.required]],
      password: [
        '',
        [Validators.required],
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        // ),
      ],
      confirmPassword: ['', [passwordConfarmation]],
    });
    this.secondFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register() {
    const registerBody = {
      userID: this.firstFormGroup.value.ID,
      username: this.firstFormGroup.value.username,
      password: this.firstFormGroup.value.password,
      city: this.secondFormGroup.value.city,
      street: this.secondFormGroup.value.street,
      name: this.secondFormGroup.value.name,
      lastname: this.secondFormGroup.value.lastName,
    };
    this.authService.onRegister(registerBody);
  }

  goBackToLogin() {
    this.router.navigateByUrl('/');
  }
}
