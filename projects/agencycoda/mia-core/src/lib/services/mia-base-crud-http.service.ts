import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MiaPagination } from '../entities/mia-pagination';
import { MiaQuery } from '../entities/mia-query';
import { MiaBaseHttpService } from './mia-base-http.service';

@Injectable({
  providedIn: 'root'
})
export class MiaBaseCrudHttpService<T> extends MiaBaseHttpService {

  basePathUrl = '';

  constructor(
    protected http: HttpClient
  ) {
    super(http);
  }

  fetch(itemId: number): Promise<T> {
    return this.get(this.basePathUrl + '/fetch/' + itemId);
  }

  fetchOb(itemId: number): Observable<T> {
    return this.getOb(this.basePathUrl + '/fetch/' + itemId);
  }

  fetchWithRelation(itemId: number, withs: Array<string>): Observable<T> {
    return this.getOb(this.basePathUrl + '/fetch/' + itemId + '?withs=' + withs.join());
  }

  save(item: T): Promise<T> {
    return this.post(this.basePathUrl + '/save', item);
  }

  saveOb(item: T): Observable<T> {
    return this.postOb(this.basePathUrl + '/save', item);
  }

  list(query: MiaQuery): Promise<MiaPagination<T>> {
    return this.post(this.basePathUrl + '/list', query.toParams());
  }

  listOb(query: MiaQuery): Observable<MiaPagination<T>> {
    return this.postOb(this.basePathUrl + '/list', query.toParams());
  }

  all(): Promise<MiaPagination<T>> {
    return this.list(new MiaQuery());
  }

  listWithOneWhere(key: string, value: any): Observable<MiaPagination<T>> {
    let query = new MiaQuery();
    query.addWhere(key, value);
    return this.listOb(query);
  }

  listWithExtras(query: MiaQuery, moreParams: any): Promise<MiaPagination<T>> {
    let data = {...query.toParams(), ...moreParams};
    return this.post(this.basePathUrl + '/list', data);
  }

  listObWithExtras(query: MiaQuery, moreParams: any): Observable<MiaPagination<T>> {
    let data = {...query.toParams(), ...moreParams};
    return this.postOb(this.basePathUrl + '/list', data);
  }

  remove(itemId: number): Promise<boolean> {
    return this.delete(this.basePathUrl + '/remove/' + itemId);
  }

  removeOb(itemId: number): Observable<boolean> {
    return this.deleteOb(this.basePathUrl + '/remove/' + itemId);
  }
}
