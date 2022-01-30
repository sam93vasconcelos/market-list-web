import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/User.model';
import { HttpService } from '../services/http-service';

interface signupResponse {
  access_token: string;
  user: User;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private authService: AuthService
  ) {}

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  creating = false;

  handleSubmit() {
    this.creating = true;

    this.http
      .post<signupResponse>('api/auth/signup', this.registerForm.value)
      .subscribe((res: signupResponse) => {
        this.authService.signup(res.access_token, res.user);
        this.creating = false;
      });
  }
}
