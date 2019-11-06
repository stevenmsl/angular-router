import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HeroService } from '../hero.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero$: Observable<Hero>;

    constructor(
        //The router extracts the route parameter (id:15) from the URL 
        //and supplies it to the HeroDetailComponent via the ActivatedRoute service.
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService
    ){}
    
    ngOnInit() {
        /*
            When you know for certain that a HeroDetailComponent instance will never, 
            never, ever be re-used, you can simplify the code with the snapshot.
            
            let id = this.route.snapshot.paramMap.get('id');
            this.hero$ = this.service.getHero(id);

            Stick with the observable paramMap approach if there's 
            even a chance that the router could re-use the component.
        */
        this.hero$ = this.route.paramMap.pipe(
            /*
              switchMap 
              - it flatten the Observable 
              - cancels previous in-flight requests. 
                If the user re-navigates to this route with a new id 
                while the HeroService is still retrieving the old id, 
                it discards that old request and returns the hero for the new id.
            */
            switchMap(
                (params: ParamMap) =>
                    this.service.getHero(params.get('id'))
            )
        );          
    }

    gotoHeroes(hero: Hero) {
        let heroId = hero ? hero.id : null;
        // - Pass along the hero id if available
        //   so that the HeroList component can select that hero.
        //   Include a junk 'foo' property for fun.
        // - navigates imperatively back to the HeroListComponent.
        this.router.navigate(['/superheroes', { id: heroId, foo: 'foo'}]);
    }



}