import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import UserType from '@app/models/user-type.model';
import User from '@app/models/user.model';
import { environment } from '@src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
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
    const url = `${environment.baseUrl}/user/login`;
    const model = new PostRequestModel({ url, body });

    return new Observable((observer) => {
      return this.http.post(model).subscribe(
        (response: any) => {
          this.currentUserSubject.next(new User(response.user));
          this.setAuthInStorage(response.token);

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
    const url = `${environment.baseUrl}/user`;
    const model = new PostRequestModel({ url, body });

    return new Observable((observer) => {
      return this.http.post(model).subscribe(
        (response: any) => {
          this.currentUserSubject.next(new User(response.user));
          this.setAuthInStorage(response.token);

          observer.next();
        },
        (error) => observer.error(error),
        () => observer.complete(),
      );
    });
  }

  public updateProfile(body: User): Observable<User> {
    const url = `${environment.baseUrl}/profile`;
    const model = new PostRequestModel({ url, body });

    return this.http.put(model);
  }

  public getUser(): void {
    const url = `${environment.baseUrl}/user/profile`;
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

  public getUserTypes(): Observable<UserType[]> {
    const url = `${environment.baseUrl}/user/roles`;
    const model = new GetRequestModel({ url });

    return new Observable((observer) => {
      this.http.get(model).subscribe((roles) => {
        const userTypes = roles.map((x: any) => new UserType(x));

        observer.next(userTypes);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  private setAuthInStorage(accessToken: string): void {
    localStorage.setItem('auth', accessToken);
  }

  private removeAuthFromStorage(): void {
    localStorage.removeItem('auth');
  }
}
