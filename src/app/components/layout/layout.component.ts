import { Component } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [Menubar, AvatarModule, Menu, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  items: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard']},
    { label: 'Inventory', icon: 'pi pi-receipt', routerLink: ['/dashboard/inventory']},
  ];
}
