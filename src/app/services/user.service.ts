import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import GetRequestModel from '../models/get-request.model';
import PostRequestModel from '../models/post-request.model';
import User from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpService) {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(body: FormBuilder): Observable<any> {
    const url = `${environment.baseUrl}/login`;
    const model = new PostRequestModel({ url, body });

    return new Observable((observer) => {
      return this.http.post(model).subscribe(
        (response: any) => {
          this.currentUserSubject.next(new User(body));
          this.setAuthInStorage(response.accessToken);

          observer.next();
        },
        (error) => observer.error(error),
        () => observer.complete(),
      );
    });
  }

  public logOut(): void {
    this.currentUserSubject.next(new User());
    this.removeAuthFromStorage();
  }

  public register(body: User): Observable<any> {
    const url = `${environment.baseUrl}/register`;
    const model = new PostRequestModel({ url, body });

    return this.http.post(model);
  }

  public updateProfile(body: User): Observable<User> {
    const url = `${environment.baseUrl}/profile`;
    const model = new PostRequestModel({ url, body });

    return this.http.put(model);
  }

  public getUser(): void {
    const url = `${environment.baseUrl}/profile`;
    const model = new GetRequestModel({ url });

    this.http.get(model).subscribe((user) => {
      this.currentUserSubject.next(new User(user));
    });
  }

  public filterUsers(nickname: string): Observable<User[]> {
    const url = `${environment.baseUrl}/users`;
    const model = new GetRequestModel({
      httpOptions: {
        params: new HttpParams().append('name', nickname),
      },
      url,
    });

    return new Observable((observer) => {
      return this.http.get(model).subscribe(
        (response: any) => {
          const users = response.map((entity: any) => new User(entity));

          observer.next(users);
        },
        (error) => observer.error(error),
        () => observer.complete(),
      );
    });
  }

  public getUserTypes(): Observable<any> {
    const url = `${environment.baseUrl}/userTypes`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }

  private setAuthInStorage(accessToken: string): void {
    localStorage.setItem('auth', accessToken);
  }

  private removeAuthFromStorage(): void {
    localStorage.removeItem('auth');
  }
}
