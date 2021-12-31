import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MiaFile } from '../entities/mia-file';
import { MiaResponse } from '../entities/mia-response';

export const MIA_GOOGLE_STORAGE_PROVIDER = new InjectionToken<MiaGoogleStorage>('agencycoda.google-storage');

@Injectable()
export class MiaGoogleStorage {
  bucket: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class GoogleStorageService {

  constructor(
    @Inject(MIA_GOOGLE_STORAGE_PROVIDER) protected config: MiaGoogleStorage,
    protected http: HttpClient
  ) { }

  public uploadFile(file: File): Observable<any> {
    var d = new Date();
    return this.http.post<any>( 'https://storage.googleapis.com/upload/storage/v1/b/' + this.config.bucket + '/o?uploadType=media&name=' + d.getMilliseconds() + '_' + d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + '_' + file.name.replace(/ /g, ""), file);
  }

  public uploadDirect(file: File): Observable<MiaResponse<MiaFile>> {
    var d = new Date();
    return this.http.post<any>( 'https://storage.googleapis.com/upload/storage/v1/b/' + this.config.bucket + '/o?uploadType=media&name=' + d.getMilliseconds() + '_' + d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + '_' + file.name.replace(/ /g, ""), file).pipe(map(data => {
      return {
        success: true,
        response: {
          name: file.name,
          url: 'https://storage.googleapis.com/' + this.config.bucket + '/' + data.name,
          mediaLink: 'https://storage.googleapis.com/' + this.config.bucket + '/' + data.name,
          size: data.size
        }
      };
    }));
  }

  public uploadWithProgressDirect(file: File): Observable<any> {
    var d = new Date();

    return this.http.post<any>( 'https://storage.googleapis.com/upload/storage/v1/b/' + this.config.bucket + '/o?uploadType=media&name=' + d.getMilliseconds() + '_' + d.getFullYear() + d.getMonth() + d.getDay() + d.getHours() + '_' + file.name.replace(/ /g, ""), file, {
      reportProgress: true,
      observe: "events"
    });
  }

  public delete(fileName: string) {
    this.http.delete('https://storage.googleapis.com/storage/v1/b/' + this.config.bucket + '/o/' + fileName).subscribe((data) => {
    });
  }
}
