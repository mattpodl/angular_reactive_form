import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder) {
  }


  public user = this.fb.group({
    name: ['', [Validators.required, ]],
    surname: ['', [Validators.required, ]],
    email: ['', [Validators.required, ]],
    phone: [''],
    password: ['', [Validators.required, ]],
    pet: ['', [Validators.required, ]],
    address: this.fb.group({
      city: ['', [Validators.required, ]],
      street: ['', [Validators.required, ]],
      building: ['', [Validators.required, ]],
      flatNo: [''],
    }),
    consents: this.fb.group({
      newsletter: ['', [Validators.required, ]],
      sms: [''],
    }),
  });

  onSubmit() {
    console.log(this.user.getRawValue());
  }

}
