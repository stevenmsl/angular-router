import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
    constructor(private cs: CrisisService, private router: Router) {}

    /*
        - EMPTY is of type Observable<never> 
          That’s why the resolve function has two possible return types 
        - Be explicit. Implement the Resolve interface with a type of Crisis.  
                
    */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
        let id = route.paramMap.get('id');
        return this.cs.getCrisis(id).pipe(
            take(1), // ensure that the Observable completes after retrieving the first value from the Observable
            mergeMap(crisis => {
                if (crisis) {                    
                    return of(crisis); //Merge it back to the output Observable so the subscriber can receive it   
                } else { //id not found 
                    this.router.navigate(['/crisis-center']);
                    return EMPTY;
                }
            })
        );
        
    }

}