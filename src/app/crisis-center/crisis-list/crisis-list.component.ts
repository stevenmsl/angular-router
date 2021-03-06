import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-crisis-list',
    templateUrl: './crisis-list.component.html',
    styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
    crises$: Observable<Crisis[]>;
    selectedId: number;

    constructor(
        private service: CrisisService,
        private route: ActivatedRoute
    ){}
    
    ngOnInit() {
        this.crises$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.selectedId = +params.get('id'); // use the + to convert a string to a number 
                console.log(`selectedId changed to ${this.selectedId}`);
                return this.service.getCrises();
            })
        );    
    }
}
