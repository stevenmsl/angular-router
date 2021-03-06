import { Component, OnInit } from "@angular/core";
import { AuthService } from '../auth.service';
import { Router, NavigationExtras, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

//TODO Need to figure out how to preserve the global query params and fragment. 
/*
    The current implementation is not working. 
*/
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    message: string;
    private state$: Observable<object>;

    constructor(public authService: AuthService, public router:Router) {
        //console.log(this.authService.isLoggedIn); 
        this.setMessage();    
    }

    ngOnInit() {

        //the following implementation is not working either
        //the state is undefined
        /*    
        this.state$ = this.router.events.pipe(
            filter( e => e instanceof NavigationStart),            
            map(() => {
                const s = this.router.getCurrentNavigation().extras.state;
                console.log(s);
                return s;
            })            
        );
        */
        //this.state$.subscribe( o => console.log(o)); 
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe( () => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                //Get the redirect URL from our auth service
                //If no redirect has been set, use the default

                //console.log(`redirectUrl: ${this.authService.redirectUrl}`);

                let redirect = this.authService.redirectUrl ?
                    //this will convert a URL string into a tree structure 
                    //check https://blog.angularindepth.com/angular-routing-series-pillar-1-router-states-and-url-matching-12520e62d0fc                    
                    //this.router.parseUrl(`${this.authService.redirectUrl}?session_id=12345678#anchor}`) :
                    this.router.parseUrl(this.authService.redirectUrl):
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
                    queryParamsHandling: 'preserve', //Nothing is preserved either the session id or the fragment 
                    preserveFragment: true
                };

                console.log(navigationExtras);

                //redirect the user
                this.router.navigateByUrl(
                    redirect, 
                    //navigationExtras
                );         
            }
        });
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }

}
