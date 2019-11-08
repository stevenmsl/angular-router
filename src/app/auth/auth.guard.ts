import { Injectable } from "@angular/core";
import { 
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras, 
    CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // store the attempted URL the user came 
        // from using the RouterStateSnapshot.url 
        let url: string = state.url;
        
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);    
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }    

    //It’s not working. After logged in session_id is gone…
    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; } 
        //store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        //create a dummy session id
        let sessionId = 12345678;
        //set navigation extras object
        //that contains our global query params and fragment
        let navigationExtras: NavigationExtras = {
            queryParams: { 'session_id': sessionId},
            fragment: 'anchor'
        }; 

        //navigate to the login page with extras
        this.router.navigate(['/login'], navigationExtras);
        return false;
    }

}