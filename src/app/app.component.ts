import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from './confirmPasswordValidator';


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
    password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[@#$%^&]).{8,}$')]],
    cpassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[@#$%^&]).{8,}$')]],
    pet: ['', [Validators.required, ]],
    address: this.fb.group({
      city: ['', [Validators.required, ]],
      street: ['', [Validators.required, ]],
      building: ['', [Validators.required, ]],
      flatNo: [null],
    }),
    consents: this.fb.group({
      newsletter: [false, Validators.requiredTrue],
      sms: [false],
    }),
  }, {
    validator: ConfirmPasswordValidator.MatchPassword
  });
  registeredUser: RegisterUser;

  ngOnInit() {

  }

  onSubmit() {
    this.registeredUser = JSON.parse(JSON.stringify(this.user.value).replace(/"\s+|\s+"/g, '"'));
    // console.log(this.registeredUser);
    // console.log('---------------------------');
    console.log(
      'Imię: ' + this.registeredUser.name +
      '\nNazwisko: ' + this.registeredUser.surname +
      '\nAdres e-mail: ' + this.registeredUser.email +
      '\nNumer telefonu: ' + this.registeredUser.phone +
      '\nHasło: ' + this.registeredUser.password +
      '\nZwierzę: ' + this.registeredUser.pet +
      '\nAdres:' +
      '\n\tMiasto: ' + this.registeredUser.address.city +
      '\n\tNazwa ulicy: ' + this.registeredUser.address.street +
      '\n\tNumer Budynku: ' + this.registeredUser.address.building +
      (this.registeredUser.address.flatNo !== null ? ('\n\tNumer Mieszkania: ' + this.registeredUser.address.flatNo) : '') +
      '\n Zgoda na newsletter: Tak' +
      '\n Zgoda na smsy: ' + (this.registeredUser.consents.sms ? 'Tak' : 'Nie')
);
    //
  }

  isValid(field: string) {
    const value = this.user.get(field);

    return value.invalid && (value.dirty || value.touched);
  }
}

interface RegisterUser {
  name: string; // Imię
  surname: string; // Nazwisko
  email: string; // E-mail
  phone: string | null; // Numer telefonu
  password: string; // Hasło
  pet: 'dog' | 'cat' | 'other'; // Zwierzę
  address: {
    city: string; // Miasto
    street: string; // Ulica
    building: string; // Numer domu
    flatNo: string | null; // Numer mieszkania
  };
  consents: {
    newsletter: boolean; // Zgoda na otrzymywanie wiadomości e-mail.
    sms: boolean; // Zgoda na otrzymywanie wiadomości SMS.
  };
}
