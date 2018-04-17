import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero()
  }

  hero: Hero;

  getHero(): void {
    const id:any = +this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id)
      .subscribe(res => {
        this.hero = res.result
      })
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    let data = {
      id: +this.route.snapshot.paramMap.get('id'),
      name: this.hero.name
    }

    this.heroService.updateHero(data)
      .subscribe(res => {
        this.getHero()
      })
  }
}
