import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    console.log('ng on init')
    this.getHeroes()
  }

  heroes: Hero[];
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(res => {
        console.log(res)
        this.heroes = res.result
      })
  }

  add(name:string): void{
    name = name.trim();
    if(!name) return;
    this.heroService.addHero(name)
      .subscribe(res => {
        if(res.code == 200) this.getHeroes()
      })
  }

  delete(hero:Hero): void{
    this.heroService.deleteHero(hero)
      .subscribe(res => {
        if(res.code == 200) this.getHeroes()
      })
  }
}
