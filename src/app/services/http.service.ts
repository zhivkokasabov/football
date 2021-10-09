import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import DeleteRequestModel from '@app/models/delete-request.model';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import { Observable } from 'rxjs';

const { assert } = console;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpOptions: any = {};

  constructor(private http: HttpClient) { }

  public post(model: PostRequestModel): Observable<any> {
    assert(!!model.url);
    assert(!!model.body);

    return new Observable((obs) => {
      this.http.post(model.url, model.body, { headers: this.httpOptions }).subscribe(
        (res) => obs.next(res),
        (error) => obs.error(error),
        () => obs.complete(),
      );
    });
  }

  public put(model: PostRequestModel): Observable<any> {
    assert(!!model.url);
    assert(!!model.body);

    return new Observable((obs) => {
      this.http.put(model.url, model.body, { headers: this.httpOptions }).subscribe(
        (res) => obs.next(res),
        (error) => obs.error(error),
        () => obs.complete(),
      );
    });
  }

  public delete(model: DeleteRequestModel): Observable<any> {
    assert(!!model.url);

    return new Observable((obs) => {
      this.http.delete(model.url, { headers: this.httpOptions }).subscribe(
        (res) => obs.next(res),
        (error) => obs.error(error),
        () => obs.complete(),
      );
    });
  }

  public get(model: GetRequestModel): Observable<any> {
    assert(!!model.url);

    return new Observable((obs) => {
      this.http.get(model.url, model.httpOptions || this.httpOptions).subscribe(
        (res) => obs.next(res),
        (error) => obs.error(error),
        () => obs.complete(),
      );
    });
  }

  public setHeader(key: string, value: string): void {
    this.httpOptions[key] = value;
  }
}
