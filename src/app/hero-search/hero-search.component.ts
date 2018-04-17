import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Result } from '../res';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }

  heroes$: Observable<Hero[]>;
  
  private searchTerms = new Subject<string>();

  search(term:string): void{
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term:string) => this.heroService.searchHeroes(term))
    )
    // this.heroes$ = this.heroService.searchGet()
  }
}
