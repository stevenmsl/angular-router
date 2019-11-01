import { Component, OnInit } from "@angular/core";
import { Crisis } from '../crisis';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/dialog.service';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
    selector: 'app-crisis-detail',
    templateUrl: './crisis-detail.component.html',
    styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
    crisis: Crisis;
    editName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialogService: DialogService
    ){
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: {crisis: Crisis}) => {
                this.editName = data.crisis.name;
                this.crisis = data.crisis;
            });
    }
    cancel() {
        this.gotoCrises();
    }

    save() {
        this.crisis.name = this.editName;
        this.gotoCrises();    
    }

    canDeactivate(): Observable<boolean> | boolean {
        //allow synchronous navigation (true) if no crisis or the crisis is unchanged
        if (!this.crisis || this.crisis.name === this.editName) {
            return true;
        } 
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides 
        return this.dialogService.confirm('Discard changes?');
    }

    gotoCrises() {
        let crisisId = this.crisis ? this.crisis.id : null;
        // Pass along the crisis id if available
        // so that the CrisisListComponent can select that crisis.
        // Add a totally useless `foo` parameter for kicks.
        // Relative navigation back to the crises - This will cause 
        //the ngOnInit in the crisis-list component to be triggered again 
        //to re-set the selectedId in the crisis-list component.
        this.router.navigate(
            [
                '../', //to go up one level in the route path
                {id: crisisId, foo: 'foo'}
            ], 
            { relativeTo: this.route});
    }

}