import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [Menubar, AvatarModule, Menu, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
    {
      label: 'Inventory',
      icon: 'pi pi-receipt',
      routerLink: ['/dashboard/inventory'],
    },
  ];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.items = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
        {
          label: 'Inventory',
          icon: 'pi pi-receipt',
          routerLink: ['/dashboard/inventory'],
        },
        {
          label: 'Clerk Management',
          icon: 'pi pi-user',
          routerLink: ['/dashboard/clerk'],
        },
      ];
    }
  }

  onLogout() {
    this.auth.logout();
  }
}
