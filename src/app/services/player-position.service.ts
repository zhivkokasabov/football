import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import GetRequestModel from '../models/get-request.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerPositionService {
  constructor(private http: HttpService) { }

  public getPlayerPositions(): Observable<any> {
    const url = `${environment.baseUrl}/playerPositions`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }
}
