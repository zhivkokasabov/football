import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PlayerPosition from '@app/models/player-position.model';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerPositionService {
  constructor(private http: HttpService) { }

  public getPlayerPositions(): Observable<any> {
    const url = `${environment.baseUrl}/PlayerPosition`;
    const model = new GetRequestModel({ url });

    return new Observable((observer) => {
      return this.http.get(model).subscribe((positions) => {
        const playerPositions = positions.map((x: any) => new PlayerPosition(x));

        observer.next(playerPositions);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }
}
