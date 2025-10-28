import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login-signup/login-signup.component').then((c) => c.LoginSignupComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/layout/layout.component').then((c) => c.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/dashboard/dashboard.component').then((c) => c.DashboardComponent),
            },
            {
                path: 'inventory',
                loadComponent: () => import('./components/inventory/inventory.component').then((c) => c.InventoryComponent),
            }
        ]
    },
    {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
