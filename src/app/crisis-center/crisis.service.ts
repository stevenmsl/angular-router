import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { MessageService } from '../message.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CrisisService {
    static nextCrisisId = 100;

    /*
        BehaviorSubject
        Requires an initial value and emits the current value to new subscribers
    */
    private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);

    constructor(private messageService: MessageService) {}

    getCrises() { return this.crises$; }

    getCrisis(id: number | string) {
        /*
            The + and - operators also have unary versions, where they operate only on one variable. 
            When used in this fashion, + returns the number representation of the object, 
            while - returns its negative counterpart.
        */
        return this.getCrises().pipe(
            map(crises => crises.find(crisis => crisis.id === +id))
        );
    }

    addCrisis(name: string) {
        name = name.trim();
        if (name) {
            let crisis = { id: CrisisService.nextCrisisId++, name};
            CRISES.push(crisis);
            this.crises$.next(CRISES); //emit new value
        }
    }


}