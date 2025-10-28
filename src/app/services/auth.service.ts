import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    {
      id: 'u1a2b3c4-0001-4d5e-8f9a-1b2c3d4e5f6g',
      email: 'admin@inventra.com',
      password: 'Admin@123',
      username: 'AdminUser',
      role: 'admin',
      mobile: '6534565437',
    },
    {
      id: 'u2b3c4d5-0002-4e6f-9a0b-2c3d4e5f6g7h',
      email: 'clerk1@inventra.com',
      password: 'Clerk1@123',
      username: 'ClerkOne',
      role: 'clerk',
      mobile: '8767867878',
    },
    {
      id: 'u3c4d5e6-0003-4f7a-0b1c-3d4e5f6g7h8i',
      email: 'clerk2@inventra.com',
      password: 'Clerk2@123',
      username: 'ClerkTwo',
      role: 'clerk',
      mobile: '9767898770',
    },
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const foundUser = this.users.find(u => u.email === email && u.password === password);
    if(foundUser){
        this.currentUser = foundUser;
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
    }
    return false;
  }

  logout(){
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  getCurrentUser(): User | null {
    if(!this.currentUser){
        const user = localStorage.getItem('user');
        this.currentUser = user ? JSON.parse(user) : null;
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean{
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean{
    const user = this.getCurrentUser();
    return user ? user.role === 'admin' : false;
  }
}
