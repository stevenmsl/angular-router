import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

//exports a constant named slideInAnimation 
//set to an animation trigger named routeAnimation
export const slideInAnimation = 
    trigger('routeAnimation',[ 
        transition('heroes <=> hero',[
            style({ position: 'relative'}),
            query(':enter, :leave', [ //query for newly inserted/removed elements.
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%'})
            ]),
            query(':leave', animateChild()),
            group([ //defines a list of animation steps to be run in parallel.
                query(':leave', [
                    animate('300ms ease-out', style({ left: '100%'}))
                ]),
                query(':enter',[
                    animate('300ms ease-out', style({ left: '0%'}))
                ])
            ]),
            query(':enter', animateChild())
        ])
    ]);
