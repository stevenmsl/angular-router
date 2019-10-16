import { Component } from "@angular/core";
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;

    constructor(public authService: AuthService, public router:Router) {
        this.setMessage();    
    }
    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn) ? 'in' : 'out';
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe( () => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                //Get the redirect URL from our auth service
                //If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ?
                    //this will convert a URL string into a tree structure 
                    //check https://blog.angularindepth.com/angular-routing-series-pillar-1-router-states-and-url-matching-12520e62d0fc                    
                    this.router.parseUrl(this.authService.redirectUrl) :
                    '/admin';
                //Set our navigation extras object
                //that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                    /*
                        Here is an example if ‘merge’ is specified: 
                        parameter page=2 is merged 
                        //from /results?page=1 to /view?page=1&page=2
                        this.router.navigate(['/view'], { queryParams: { page: 2 },  queryParamsHandling: "merge" });
                    */
                    queryParamsHandling: 'preserve',
                    preserveFragment: true
                };

                //redirect the user
                this.router.navigateByUrl(redirect, navigationExtras);         
            }
        });
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }

}
