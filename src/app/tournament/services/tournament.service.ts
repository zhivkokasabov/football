import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import Tournament from '../models/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {

  constructor(private http: HttpService) { }

  public newTournament(body: Tournament): Observable<any> {
    const url = `${environment.baseUrl}/tournaments`;
    const model = new PostRequestModel({ url, body });

    return this.http.post(model);
  }

  public getTournament(tournamentId: number): Observable<any> {
    const url = `${environment.baseUrl}/tournaments/${tournamentId}`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }
}
