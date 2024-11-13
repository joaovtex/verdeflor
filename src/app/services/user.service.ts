import { Injectable } from '@angular/core';
import { userEnvironment } from '../environments/envitonment';
import { User } from '../entities/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = userEnvironment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  message(msg: String): void {
    this.snack.open(`${msg}`, `OK`, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  logar(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, user);
}

}
