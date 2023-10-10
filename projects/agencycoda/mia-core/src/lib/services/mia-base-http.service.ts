import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiaResponse } from '../entities/mia-response';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MiaCoreConfig, MIA_CORE_PROVIDER } from '../entities/mia-core-config';

@Injectable({
  providedIn: 'root'
})
export class MiaBaseHttpService {

  constructor(
    @Inject(MIA_CORE_PROVIDER) protected config: MiaCoreConfig,
    protected http: HttpClient
  ) { }

  public post<T>(url: string, params: any): Observable<any> {
    if(this.config.v2){
      return this.http.post<T>(url, params);
    }

    return this.http.post<MiaResponse<T>>(url, params).pipe(map(result => {
      if(result.success){
        return result.response!;
      }

      throw result.error;
    }))
    .pipe(catchError((err, caught) => {
      console.log('MIA Core Error - URL: ' + url);
      console.log('MIA Core Error - Params: ');
      console.log(params);
      throw err;
    }));
  }

  public get<T>(url: string): Observable<any> {
    if(this.config.v2){
      return this.http.get<T>(url);
    }

    return this.http.get<MiaResponse<T>>(url).pipe(map(result => {
      if(result.success){
        return result.response!;
      }

      throw result.error;
    }))
    .pipe(catchError((err, caught) => {
      console.log('MIA Core Error - URL: ' + url);
      console.log('MIA Core Error - Params None');
      throw err;
    }));
  }

  public delete<T>(url: string): Observable<any> {
    if(this.config.v2){
      return this.http.delete<T>(url);
    }

    return this.http.delete<MiaResponse<T>>(url).pipe(map(result => {
      if(result.success){
        return result.response!;
      }

      throw result.error;
    }))
    .pipe(catchError((err, caught) => {
      console.log('MIA Core Error - URL: ' + url);
      console.log('MIA Core Error - Params None');
      throw err;
    }));
  }
}
