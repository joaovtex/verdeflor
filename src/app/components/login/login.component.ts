import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    this.user.id = this.route.snapshot.paramMap.get("id")!

    this.userCredenciais()
  }

  userCredenciais(): void {
    this.service.userCredenciais(this.user.id).subscribe((resposta) => {
      console.log("Dados recebidos:", resposta); // Para verificar o retorno
      this.user = resposta;
    });
  }

  logar() {
    if(this.inputs.email === this.user.email && this.inputs.senha === this.user.senha) {
      this.router.navigate(['funcionarios'])
    } else {
      this.service.message("Credenciais inválidas!")
    }
  }

}
