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
    email: 'admin@gmail.com',
    senha: '@admin123'
  }

  inputs = {
    email: '',
    senha: ''
  }

  constructor(
    private router: Router,
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userCredenciais()
  }

  userCredenciais(): void {
    //window.alert('entrou na funcao')

    this.service.userCredenciais(1).subscribe((resposta) => {
      //window.alert('bbbb')
      console.log("Dados recebidos:", resposta); // Para verificar o retorno
      //this.service.message('pegou os dados')
      this.user = resposta;
    });

  }

  logar(): void {
    //window.alert('a')

    this.ngOnInit()

    if(this.inputs.email === this.user.email && this.inputs.senha === this.user.senha) {
      this.router.navigate(['funcionarios'])
    } else {
      this.service.message("Credenciais inválidas!")
    }
  }

}
