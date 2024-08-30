import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private apiUrl = "https://localhost:7093/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllPlayer(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(this.apiUrl + '/Players')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getPlayer(id: number): Observable<Player> {
    return this.httpClient.get<Player>(this.apiUrl + '/Players/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createPlayer(player: Player): Observable<Player> {
    return this.httpClient.post<Player>(this.apiUrl + '/Players/', JSON.stringify(player), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.httpClient.put<Player>(this.apiUrl + '/Players/' + id, JSON.stringify(player), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deletePlayer(id: number) {
    return this.httpClient.delete<Player>(this.apiUrl + '/Players/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
