import {Component, Directive, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }
public user = this.fb.group({
    name: ['', [Validators.required, ]],
    surname: ['', [Validators.required, ]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.minLength(1), Validators.pattern('^[0-9 ()+-]*$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[@#$%^&]).{8,}$') ]],
    pet: ['', [Validators.required, ]],
    address: this.fb.group({
      city: ['', [Validators.required, ]],
      street: ['', [Validators.required, ]],
      building: ['', [Validators.required, ]],
      flatNo: [''],
    }),
    consents: this.fb.group({
      newsletter: [false, [Validators.requiredTrue, ]],
      sms: [false],
    }),
  });


ngOnInit() {

}

  onSubmit() {
    console.log(this.user.getRawValue());
  }

  isValid(field: string) {
  const value = this.user.get(field);

  return value.invalid && (value.dirty || value.touched);
  }
}
