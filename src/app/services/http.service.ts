import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import GetRequestModel from '../models/get-request.model';
import PostRequestModel from '../models/post-request.model';
import { SnackbarService } from './snackbar.service';

const { assert } = console;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpOptions: any = {};

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) { }

  public post(model: PostRequestModel): Observable<any> {
    assert(!!model.url);
    assert(!!model.body);

    return new Observable((obs) => {
      this.http.post(model.url, model.body, { headers: this.httpOptions }).subscribe(
        (res) => obs.next(res),
        (error) => {
          this.snackbarService.error(error.error);
          obs.error(error);
        },
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
        (error) => {
          this.snackbarService.error(error.error);
          obs.error(error);
        },
        () => obs.complete(),
      );
    });
  }

  public get(model: GetRequestModel): Observable<any> {
    assert(!!model.url);

    return new Observable((obs) => {
      this.http.get(model.url, { headers: this.httpOptions }).subscribe(
        (res) => obs.next(res),
        (error) => {
          this.snackbarService.error(error.error);
          obs.error(error);
        },
        () => obs.complete(),
      );
    });
  }

  public setHeader(key: string, value: string): void {
    this.httpOptions[key] = value;
  }
}
