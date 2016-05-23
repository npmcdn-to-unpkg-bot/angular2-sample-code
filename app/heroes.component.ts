import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];
  onSelect(hero: Hero) { this.selectedHero = hero; }
  constructor(private heroService: HeroService, private router: Router) { }
  ngOnInit() {
    console.log('in onInit');
    this.getHeroes();
  }

  getHeroes() {
    console.log('in getHeroes');
    this.heroService.getHeroesSlowly().then(heroes => {
      this.heroes = heroes;
      console.log('this.heroes', this.heroes);
    });
  }
  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

}



