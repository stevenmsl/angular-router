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
        EMPTY is of type Observable<never> 
        That’s why the resolve function has two possible return types  
    */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
        let id = route.paramMap.get('id');

        return this.cs.getCrisis(id).pipe(
            take(1),
            mergeMap(crisis => {
                if (crisis) {
                    return of(crisis);    
                } else { //id not found 
                    this.router.navigate(['/crisis-center']);
                    return EMPTY;
                }
            })
        );
        
    }

}