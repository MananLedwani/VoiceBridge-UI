import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { TableModule } from 'primeng/table';
import { Button } from "primeng/button";
import { Tooltip } from "primeng/tooltip";

@Component({
  selector: 'app-clerk-management',
  imports: [TableModule, Button, Tooltip],
  templateUrl: './clerk-management.component.html',
  styleUrl: './clerk-management.component.scss',
})
export class ClerkManagementComponent {
  clerks: User[] = [
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
}
