import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jsonp, URLSearchParams } from '@angular/http'

import { Result } from './res'

import { Hero } from './hero';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';


const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
const httpOptionsFrom = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private log(message:string) {
    this.messageService.add('HeroService: '+ message)
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private heroesApi = 'http://192.168.0.228:8080/heroes';
  private heroApi = 'http://192.168.0.228:8080/hero/';
  private updateHeroApi = 'http://192.168.0.228:8080/updateHero';
  private addHeroApi = 'http://192.168.0.228:8080/addHero';
  private deleteHeroApi = 'http://192.168.0.228:8080/deleteHero';
  private serachHeresApi = 'http://192.168.0.228:8080/searchHero';

  getHeroes(): Observable<Result> {
    return this.http.get<any>(this.heroesApi).pipe(
      tap(res => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    )
  }

  getHero(id:number): Observable<Result> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<any>(this.heroApi+id)
  }

  updateHero(bodyData:any): Observable<Result> {
    this.messageService.add(`HeroService: update hero id=${bodyData.id}`);
    console.log(bodyData)
    let params = new URLSearchParams();
    params.set('id', bodyData.id);
    params.set('name', bodyData.name);
    console.log(params.toString())
    return this.http.post<any>(this.updateHeroApi, params.toString(), httpOptionsFrom)
  }

  addHero(name:any): Observable<Result> {
    let params = new URLSearchParams();
    params.set('name', name)
    return this.http.post<any>(this.addHeroApi, params.toString(), httpOptionsFrom).pipe(
      tap(() => this.log(`added hero w/ name=${name}`))
    )
  }

  deleteHero(hero:Hero): Observable<Result> {
    let params = new URLSearchParams();
    params.set('id', hero.id.toString())
    return this.http.post<any>(this.deleteHeroApi, params.toString(), httpOptionsFrom).pipe(
      tap(() => this.log(`delete hero w/ name=${hero.name}`))
    )
  }

  searchHeroes(keyWord:string): Observable<Hero[]> {
    let params = new URLSearchParams();
    params.set('kw', keyWord.toString())
    return this.http.post<any>(this.serachHeresApi, params.toString(), httpOptionsFrom).pipe(
      tap(() => this.log(`delete hero w/ keyword=${keyWord}`))
    )
  }

  private searchTest = 'http://192.168.0.228:8080/searchGet'
  searchGet(): Observable<Hero[]> {
    return this.http.get<any>(this.searchTest).pipe(
      tap(res => this.log(`fetched heroes`))
    )
  }
}
