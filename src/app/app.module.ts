import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

/*
The Angular Router is an optional service that presents 
a particular component view for a given URL. 
It is not part of the Angular core. 
*/
import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //Each routing module augments the route configuration in the order of import.
    HeroesModule, //imports HeroesRoutingModule
    AppRoutingModule //this should be listed the last
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(router: Router) {
    const replacer = (key, value) => 
      (typeof value === 'function') ? value.name : value;

   //console.log('Routes: ', JSON.stringify(router.config, replacer, 2));  
   //console.log(router.config);

  }

}
