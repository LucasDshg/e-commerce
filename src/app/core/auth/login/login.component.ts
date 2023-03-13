import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, catchError, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { getValueForm } from '@utils/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  errorMessage!: string;
  loading: boolean = false;

  private _onDestroy!: Subscription;
  constructor(private _fb: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      user: 'lucas.gomes',
      pass: 'lucas123',
    });
  }

  ngOnDestroy(): void {
    if (this._onDestroy) this._onDestroy.unsubscribe();
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const user = getValueForm('user', this.form);
    const pass = getValueForm('pass', this.form);

    this._onDestroy = this._authService
      .login(user, pass)
      .pipe(
        finalize(() => (this.loading = false)),
        catchError((err) => (this.errorMessage = err.message)),
      )
      .subscribe();
  }
}
