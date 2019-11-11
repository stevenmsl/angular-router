import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  /*
    The router calls the preload method with two arguments:
    - The route to consider.
    - A loader function that can load the routed module asynchronously.
  */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data["preload"]) {
      //add the route path to the preloaded module array
      this.preloadedModules.push(route.path);
      console.log("Preloaded: " + route.path);
      /*
        If the route should preload, it returns the observable returned by calling the loader function.
      */
      return load();
    } else {
      return of(null); //must return observable
    }
  }
}
