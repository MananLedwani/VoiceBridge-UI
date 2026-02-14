import { Component } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Menubar, AvatarModule, Menu, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  items: MenuItem[] = [
    { label: 'Text to Text', 
      icon: 'pi pi-language', 
      routerLink: ['/home/text-to-text'] },
    {
      label: 'Text to Speech',
      icon: 'pi pi-language',
      routerLink: ['/home/text-to-speech'],
    },
    {
      label: 'Speech to Speech',
      icon: 'pi pi-language',
      routerLink: ['/home/speech-to-speech'],
    },
    {
      label: 'Speech to Text',
      icon: 'pi pi-language',
      routerLink: ['/home/speech-to-text']
    }
  ];

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/login']);
  }
}
