import { Component } from '@angular/core';
import { Login } from '../../models/login.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  loginDetails: Login = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm){
    if(form.valid){
      const success = this.authService.login(this.loginDetails.email, this.loginDetails.password);
      if(success){
        this.router.navigate(['/dashboard'], {replaceUrl: true});
      }
    }
  }
}
