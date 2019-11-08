import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';


/*
    - The CrisisDetailComponent will have this method. But the guard doesn't have to know that. 
      The guard shouldn't know the details of any component's deactivation method. 
      It need only detect that the component has a canDeactivate() method and call it. 
      This approach makes the guard reusable.
*/

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }    
}