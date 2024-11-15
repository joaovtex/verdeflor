import { Injectable } from '@angular/core';
import { environment } from '../environments/envitonment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../entities/funcionario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  message(msg: String): void {
    this.snack.open(`${msg}`, `OK`, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}`)
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url)
  }

  cadastrar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario)
  }

  pesquisarID(id: any): Observable<Funcionario> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Funcionario>(url)
  }

  pesquisarPorNome(nome: string): Observable<Funcionario[]> {
    const url = `${this.baseUrl}/nome/${nome}`;
    return this.http.get<Funcionario[]>(url);
  }

  listarAtivos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}/ativos`);
  }

  listarInativos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}/inativos`);
  }


}
