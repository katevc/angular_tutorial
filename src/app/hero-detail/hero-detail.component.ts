import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  
  /*Inject services into the constructor and save their values in private fields*/
  constructor(
    private route: ActivatedRoute, //holds information about the route for this instance of heroDetailComponenet
    private heroService: HeroService, //gets hero data back from "remote server"
    private location: Location //angular service for interacting w/ browser (navigate backwards)
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    /* route snapshot is a static img of route info after component is created */
    /* paramMap = dictionary of route parameter values extracted from URL - access values using key names (like id) */
    const id = Number(this.route.snapshot.paramMap.get('id')); //"number" converts a string to a number (i.e. what heroID should be)
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    /*Using injected Location service, go back one step in the browsers history */
    this.location.back();
  }
  /* write hero values back to server if modified so changes persist*/
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
