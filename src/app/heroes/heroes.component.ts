import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //declaration (leaves variable undefined)
  heroes: Hero[] = [];
  //selectedHero?: Hero;

  //inject HeroService into private heroService property
  constructor(private heroService: HeroService, private messageService : MessageService) { }

  /* best practice to call getHeroes in ngOnInit b/c constructor above 
      should only be used for minimal initialization 
      
      ngOnInit will be called at an appropriate time AFTER the 
      HeroesComponent instance has been constructed */

  ngOnInit(): void {
    this.getHeroes();
  }
  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add('Heroes Component: selected hero id=${hero.id}');
  }*/
  /* method to retrieve heros from the service */
  getHeroes(): void {
    /* Before:
        this.heroes = this.heroService.getHeroes();
      This assigned an array to the heroes property in the class. The above code worked synchronously, 
      which wouldn't work if HeroService was making requests of remote server.
    */

    /* Now:
       HeroService waits for the observable to emit array of heroes, which can happen in the future. 
       Subscribe() method passes the emitted array to the callback/sets heroes component property.
       This is asynchronous so it works w/ remote server.
    */
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    /**Creates "hero-like" obj and passes it to hero service's "addHero" method*/
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => { //after addHero saves, subscribe() callback recieves new hero and pushes to heroes list
        this.heroes.push(hero);
      });
  }
  /**Component is responsible for updating its own list of heroes (even if the actual deletion is done by hero service).
   * Automatically deletes (and assumed service is successful in deleting)
   */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    /**doesn't need to do anything w/ the observable returned by heroService.delete() but component has to subscribe() anyway. 
     * Observable would do nothing w/out something subscribing
    */
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
