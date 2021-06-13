import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
/**NOTE THAT CLASS DOESN'T ACTUALLY SUBSCRIBE TO heroes$ (that occurs in the AsyncPipe in html) */
export class HeroSearchComponent implements OnInit {
  //heroes is declared as an observable
  heroes$!: Observable<Hero[]>;

  /**Subject is an Observable and source of observable values (can subscribe to subject, like an observable)
   * SearchTerm from input box in html becomes an Observable with steady stream of search terms (as updated)
   */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /** passing new search term after every keystroke would create excessive # of http requests (and strain server)
   * So, instead, ngOnInit pipes searchTerms through sequence of RxJs operators that reduce # of calls to searchHeroes
   */
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      // ensures that request is only sent if filter term changed
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}