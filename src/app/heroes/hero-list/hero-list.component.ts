import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
    heroes$: Observable<Hero[]>;
    selectedId: number;

    constructor(
        private service: HeroService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        /*        
          http://localhost:4200/superheroes;id=11;foo=foo

          matrix URL notation
          Although matrix notation never made it into the HTML standard, 
          it is legal and it became popular among browser routing systems
          as a way to isolate parameters belonging to parent and child routes.
        */
        this.heroes$ = this.route.paramMap.pipe(
            switchMap(params => {
                // (+) before `params.get()` turns the string into a number
                this.selectedId = +params.get('id');
                return this.service.getHeroes();
            })
        );
    }
}
