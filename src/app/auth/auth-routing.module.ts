import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    /*
        Since the router deals with a global shared resource--location, we cannot have more than one router service active.
        forRoot creates a module that contains all the directives, the given routes, and the router service itself.
        forChild creates a module that contains all the directives and the given routes, but does not include the router service.
   */
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
 
})
export class AuthRoutingModule {}