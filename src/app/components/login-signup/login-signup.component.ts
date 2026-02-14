import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  isLogin: WritableSignal<boolean> = signal(true);

  users: any[] = []; 

  constructor(private router: Router){}

  toggle() {
    this.isLogin.set(!this.isLogin());
  }

  onLogin(form: any) {
    if (form.invalid) return;

    const found = this.users.find(
      (u) => u.email === form.value.email && u.password === form.value.password
    );

    if (found) {
      alert('Login successful!'); 
      this.router.navigate(['/home/text-to-text']);
    }
    else alert('Invalid credentials');
  }

  onSignup(form: any) {
    if (form.invalid) return;

    this.users.push(form.value);
    alert('Signup successful! You can now log in.');
    this.isLogin.set(true);
  }
}
