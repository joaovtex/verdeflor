import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTodosComponent } from './components/listar-todos/listar-todos.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AtualizarComponent } from './components/atualizar/atualizar.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'funcionarios',
    component: ListarTodosComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'atualizar/:id',
    component: AtualizarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
