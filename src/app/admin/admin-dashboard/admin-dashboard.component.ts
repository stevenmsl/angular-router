import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SelectivePreloadingStrategyService } from '../../selective-preloading-strategy.srvice';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './adming-dashbaord.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    sessionId: Observable<string>;
    token: Observable<string>;
    modules: string[];

    constructor(
        private route: ActivatedRoute,
        preloadStrategy: SelectivePreloadingStrategyService
    ) {
        this.modules = preloadStrategy.preloadedModules;        
    }
    ngOnInit() {
        //capture the session ID if available
        this.sessionId = this.route
            .queryParamMap
            .pipe(map(params => params.get('session_id') || 'None' ));

        //capture the fragment if available
        //a fragment identifier is a string of characters that refers to a resource that is subordinate to another, primary resource
        this.token = this.route
            .fragment
            .pipe(map(fragment => fragment || 'None'));
    }

}