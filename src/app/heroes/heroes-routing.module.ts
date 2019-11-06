import { Routes, RouterModule } from "@angular/router";
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NgModule } from '@angular/core';

/*
The Routing Module replaces the routing configuration in the root or feature module. 
Either configure routes in the Routing Module or within the module itself but not in both.
The Routing Module is a design choice whose value is most obvious 
when the configuration is complex and includes specialized guard and resolver services.
*/

const heroesRoutes: Routes = [
    { path: 'heroes', redirectTo: '/superheroes'},
    { path: 'hero/:id', redirectTo: '/superhero/:id'},
    { path: 'superheroes', component: HeroListComponent, data: { animation: 'heroes'}},
    { path: 'superhero/:id', component: HeroDetailComponent, data: { animation: 'hero'}}
];

@NgModule({
    imports: [
        // In any other (feature) module, you must call the RouterModule.forChild method to register additional routes.
        RouterModule.forChild(heroesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HeroesRoutingModule {}