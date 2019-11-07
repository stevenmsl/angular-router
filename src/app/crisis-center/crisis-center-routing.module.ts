import { Routes, RouterModule } from "@angular/router";
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { NgModule } from '@angular/core';



const crisisCenterRoutes: Routes = [
    {
        path: '',
        component: CrisisCenterComponent,
        children: [
            {
                path: '',
                component: CrisisListComponent,
                children: [
                    {
                        path: ':id', // path: /crisis-center/2 (/crisis-center + '' + '/2').
                        component: CrisisDetailComponent,
                        canDeactivate: [CanDeactivateGuard],
                        resolve: {
                            crisis: CrisisDetailResolverService        
                        }
                    },
                    {
                        path: '', // path: /crisis-center (/crisis-center + '' + '').
                        component: CrisisCenterHomeComponent
                    }
                ]
            }
        ]        
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(crisisCenterRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CrisisCenterRoutingModule {}