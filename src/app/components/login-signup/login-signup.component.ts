import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-signup',
  imports: [FormsModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  isLogin: WritableSignal<boolean> = signal(true);

  users: any[] = []; 

  constructor(private router: Router, private messageService: MessageService){}

  showSuccess(message: string): void{
     this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string): void{
     this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
  }

  toggle() {
    this.isLogin.set(!this.isLogin());
  }

  onLogin(form: any) {
    if (form.invalid) return;

    const found = this.users.find(
      (u) => u.email === form.value.email && u.password === form.value.password
    );

    if (found) {
      this.showSuccess("Login Successful!")
      this.router.navigate(['/home/text-to-text']);
    }
    else this.showError("Invalid Credentials");
  }

  onSignup(form: any) {
    if (form.invalid) return;

    this.users.push(form.value);
    this.showSuccess("Signup successful! You can now log in.");
    this.isLogin.set(true);
  }
}
