import { Injectable } from "@angular/core";
import { MessageService } from '../message.service';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    constructor(private messageService: MessageService) { }

    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: fetched heroes');
        return of(HEROES);    
    }

    getHero(id: number | string) {
        return this.getHeroes().pipe(
            // (+) before `id` turns the string into a number
            map((heroes: Hero[]) => heroes.find(hero => hero.id === +id))
        );    
    }
}