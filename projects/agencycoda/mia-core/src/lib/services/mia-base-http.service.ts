import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiaResponse } from '../entities/mia-response';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MiaBaseHttpService {

  constructor(
    protected http: HttpClient
  ) { }

  public post<T>(url: string, params: any): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      this.http.post<MiaResponse<T>>(url, params)
      .toPromise()
      .then(result => {
        if (result?.success) {
          resolve(result.response);
        } else {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params: ');
          console.log(params);
          reject(result?.error);
        }
      })
      .catch(error => {
        console.log('MIA Core Error - URL: ' + url);
        console.log('MIA Core Error - Params: ');
        console.log(params);
        reject(error);
      });
    });
  }

  public postOb<T>(url: string, params: any): Observable<any> {
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

  public get<T>(url: string): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<MiaResponse<T>>(url)
      .toPromise()
      .then(result => {
        if (result?.success) {
          resolve(result.response);
        } else {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params None');
          reject(result?.error);
        }
      })
      .catch(error => {
        console.log('MIA Core Error - URL: ' + url);
        console.log('MIA Core Error - Params None');
        reject(error);
      });
    });
  }

  public getOb<T>(url: string): Observable<any> {
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

  public delete<T>(url: string): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      this.http.delete<MiaResponse<T>>(url)
      .toPromise()
      .then(result => {
        if (result?.success) {
          resolve(result.response);
        } else {
          console.log('MIA Core Error - URL: ' + url);
          console.log('MIA Core Error - Params None');
          reject(result?.error);
        }
      })
      .catch(error => {
        console.log('MIA Core Error - URL: ' + url);
        console.log('MIA Core Error - Params None');
        reject(error);
      });
    });
  }

  public deleteOb<T>(url: string): Observable<any> {
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
