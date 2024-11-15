import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user: User = {
    id: '',
    email: '',
    senha: ''
  }

  constructor(
    private router: Router,
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  logar(): void {
    this.service.logar(this.user).subscribe(
      (resposta: boolean) => {
        if (resposta) {
          this.router.navigate(['funcionarios']);
        } else {
          this.service.message("Credenciais inválidas!")
        }
      },
      (error) => {
        alert('Erro ao fazer login! Verifique a conexão com o servidor.');
      }
    );
  }


}
