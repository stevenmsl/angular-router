import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../auth/auth.guard';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const adminRoutes: Routes = [
  {
    path:'',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        /*
          - this is a component-less route.
          - The goal is to group the routes under the admin path. You don't need a component to do it.  
        */
        path: '', 
        canActivateChild: [AuthGuard], //makes it easier to guard child routes.
        children: [
          {
            path: '',
            children: [
              { path: 'crises', component: ManageCrisesComponent},
              { path: 'heroes', component: ManageHeroesComponent},
              { path: '', component: AdminDashboardComponent}
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
