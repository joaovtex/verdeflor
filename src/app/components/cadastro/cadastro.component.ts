import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../../entities/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit {
  funcionario: Funcionario = {
    nome: '',
    cpf: '',
    salario: 0,
    dtAdmissao: new Date()
  }

  constructor(private router: Router, private service: FuncionarioService, private location: Location) { }

  ngOnInit(): void {

  }

  cancelar(): void {
    this.location.back()
  }

  formatarData(): void {
    let data = new Date(this.funcionario.dtAdmissao).toISOString()
  }

  cadastrar(): void {
    if (this.funcionario.nome.trim().length === 0 || this.funcionario.cpf.trim().length === 0 || String(this.funcionario.salario).trim().length === 0) {

      this.service.message('Preencha todos os campos!')

    } else if (!this.validarCPF(String(this.funcionario.cpf))) {

      this.service.message('CPF inválido!')

    }
    else if (Number(this.funcionario.salario) < 1412) {

      this.service.message('Valor do salário inválido!')

    } else {

      this.funcionario.cpf = this.formatarCPF(String(this.funcionario.cpf))

      this.formatarData()

      console.log(this.funcionario)

      this.service.cadastrar(this.funcionario).subscribe((resposta) => {
        this.service.message('Funcionário cadastrado com sucesso.')
      },
        (err) => {
          this.service.message('Erro ao cadastrar funcionário!')
        }
      )
      this.cancelar()
    }
  }

  validarCPF(cpf: string): boolean {

    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  formatarCPF(cpf: string): any {
    cpf = cpf.replace(/[^\d]+/g, '');

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
