import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ClerkManagementGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean{
        if(this.authService.isLoggedIn() && this.authService.isAdmin()) return true;
        else if(this.authService.isLoggedIn()){
            this.router.navigate(['/access-denied'], {replaceUrl: true});
        }else{
            this.router.navigate(['/login'], {replaceUrl: true});
        }
        return false;
    }
}