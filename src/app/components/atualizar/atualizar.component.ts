import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../entities/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrl: './atualizar.component.scss'
})
export class AtualizarComponent implements OnInit {
  funcionario: Funcionario = {
    nome: '',
    cpf: '',
    salario: 0,
    dtAdmissao: new Date()
  }

  constructor(private router: Router, private service: FuncionarioService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.funcionario.id = this.route.snapshot.paramMap.get("id")!

    this.pesquisarID()
  }

  pesquisarID(): void {
    this.service.pesquisarID(this.funcionario.id).subscribe((resposta) => {
      console.log("Dados recebidos:", resposta); // Para verificar o retorno
      this.funcionario = resposta;

      // Ajuste a data para evitar diferenças de fuso horário
      this.funcionario.dtAdmissao = new Date(resposta.dtAdmissao + 'T00:00:00');
    });
  }

  cancelar(): void {
    this.location.back()
  }

  formatarData(): void {
    let data = new Date(this.funcionario.dtAdmissao).toISOString()
  }

  atualizar(): void {
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
        this.service.message('Funcionário alterado com sucesso.')
      },
        (err) => {
          this.service.message('Erro ao alterar funcionário!')
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
