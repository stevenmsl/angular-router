import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { SelectivePreloadingStrategyService } from "./selective-preloading-strategy.srvice";
import { ComposeMessageComponent } from "./compose-message/compose-message.component";

const appRoutes: Routes = [
  {
    path: "compose",
    component: ComposeMessageComponent,
    outlet: "popup"
  },
  {
    /* 
        lazy loading ( load modules on-demand) benefits
        - load feature areas only when requested by the user
        - speed up load time for users that only visit certain areas of the application
        - continue expanding lazy loaded feature areas 
          without increasing the size of the initial load bundle.
    */

    path: "admin",
    /*
        The loadChildren property takes a function that returns a promise 
        using the browser's built-in syntax for lazy loading code using 
        dynamic imports import('...'). 
        The path is the location of the AdminModule (relative to the app root). 
        After the code is requested and loaded, 
        the Promise resolves an object that contains the NgModule, in this case the AdminModule.
    */
    /*  
        Keep in mind Keep in mind that you are importing the AdminModule; 
        The AdminRoutingModule will be imported as a result.
    */

    loadChildren: () =>
      import("./admin/admin.module").then(mod => mod.AdminModule),

    /*
        The router sets the canLoad() method's route parameter to the intended destination URL.
    */
    canLoad: [AuthGuard]
  },
  {
    path: "crisis-center",
    loadChildren: () =>
      import("./crisis-center/crisis-center.module").then(
        mod => mod.CrisisCenterModule
      ),
    data: { preload: true }
  },
  {
    //Migrating URLs with Redirects
    path: "",
    redirectTo: "/superheroes",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
