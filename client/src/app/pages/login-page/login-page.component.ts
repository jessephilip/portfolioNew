import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  public form = new FormGroup({
    password: new FormControl(),
  });

  public ngOnInit(): void {}

  public onSubmit() {
    const passwordFormControl = this.form.get('password');

    this.authService
      .login(passwordFormControl.value)
      .pipe(tap(() => this.form.reset()))
      .subscribe({
        next: () => {
          this.router.navigate(['landing']);
        },
      });
  }
}
