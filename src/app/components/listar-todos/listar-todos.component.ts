import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../entities/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrls: ['./listar-todos.component.scss']
})

export class ListarTodosComponent implements OnInit {
  list: Funcionario[] = [];
  ordenacao: string = 'nome';
  nomePesquisa: string = '';
  statusFiltro: string = 'todos';

  constructor(private service: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
      this.ordenarLista();
    });
  }

  pesquisarPorNome(): void {
    if (this.nomePesquisa.trim() === '') {
      this.findAll();
    } else {
      this.service.pesquisarPorNome(this.nomePesquisa).subscribe((resposta) => {
        this.list = resposta;
      });
    }
  }

  limparPesquisa(): void {
    this.nomePesquisa = '';
    this.findAll();
  }

  delete(id: any): void {
    let confirma = confirm("Confirma a exclusão do funcionário?")

    if (confirma) {
      this.service.delete(id).subscribe((resposta) => {
        if (resposta === null) {
          this.service.message(`Funcionário excluído com sucesso!`);
          this.list = this.list.filter(funcionario => funcionario.id !== id);
        } else {
          this.service.message('Não foi possível excluir o registro.');
        }
      });
    } else {
      this.service.message("Exclusão cancelada.")
    }
  }

  ordenarLista(): void {
    switch (this.ordenacao) {
      case 'nome':
        this.list.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'salarioAsc':
        this.list.sort((a, b) => a.salario - b.salario);
        break;
      case 'salarioDesc':
        this.list.sort((a, b) => b.salario - a.salario);
        break;
      case 'dtAdmissaoAsc':
        this.list.sort((a, b) => new Date(a.dtAdmissao).getTime() - new Date(b.dtAdmissao).getTime());
        break;
      case 'dtAdmissaoDesc':
        this.list.sort((a, b) => new Date(b.dtAdmissao).getTime() - new Date(a.dtAdmissao).getTime());
        break;
    }
  }

  filtrarPorStatus(): void {
    switch (this.statusFiltro) {
      case 'ativos':
        this.service.listarAtivos().subscribe((resposta) => {
          this.list = resposta;
          this.ordenarLista();
        });
        break;

      case 'inativos':
        this.service.listarInativos().subscribe((resposta) => {
          this.list = resposta;
          this.ordenarLista();
        });
        break;

      default:
        this.findAll();
        break;
    }
  }


  cadastrar(): void {
    this.router.navigate(['cadastro']);
  }

  editar(id: any): void {
    this.router.navigate([`atualizar/${id}`]);
  }
}
