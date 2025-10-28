import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ClerkManagementGuard } from './guards/clerk-management.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login-signup/login-signup.component').then((c) => c.LoginSignupComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/layout/layout.component').then((c) => c.LayoutComponent),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./components/dashboard/dashboard.component').then((c) => c.DashboardComponent),
            },
            {
                path: 'inventory',
                loadComponent: () => import('./components/inventory/inventory.component').then((c) => c.InventoryComponent),
            },
            {
                path: 'clerk',
                loadComponent: () => import('./components/clerk-management/clerk-management.component').then((c) => c.ClerkManagementComponent),
                canActivate: [ClerkManagementGuard],
            }
        ]
    },
    {
        path: 'access-denied',
        loadComponent: () => import('./components/access-denied/access-denied.component').then((c) => c.AccessDeniedComponent),
    },
    {
        path: 'error',
        loadComponent: () => import('./components/error-page/error-page.component').then((c) => c.ErrorPageComponent),
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'error', pathMatch: 'full'},
];
