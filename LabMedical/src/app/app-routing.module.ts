import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {NoneLayoutComponent} from "./shared/layouts/none-layout/none-layout.component";
import {FullLayoutComponent} from "./shared/layouts/full-layout/full-layout.component";
import {TesteComponent} from "./pages/teste/teste.component";
import {RolesEnum} from "./shared/enums/roles.enum";
import {RoleGuard} from "./shared/guards/role.guard";
import {Teste2Component} from "./pages/teste/teste2/teste2.component";
import {UsersTableComponent} from './components/registers/user/users-table/users-table.component';
import {UserRegisterFormComponent} from './components/registers/user/user-register-form/user-register-form.component';
import {LogPanelComponent} from "./pages/log-panel/log-panel.component";
import {ProntuarioEletronicoComponent} from './pages/prontuario/prontuario-eletronico/prontuario-eletronico.component';
import {SystemCustomizationComponent} from "./pages/system-customization/system-customization.component";

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    title: 'Home',
    component: FullLayoutComponent, children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Cadastro de Usuários',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN]
    },
    component: FullLayoutComponent, children: [
      {
        path: '', redirectTo: 'listar', pathMatch: 'full'
      },
      {
        path: 'listar',
        component: UsersTableComponent
      },
      {
        path: 'cadastrar',
        component: UserRegisterFormComponent
      },
      {
        path: 'buscar/:id',
        component: UserRegisterFormComponent
      }
    ]
  },
  {
    path: 'log/panel',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Painel Log',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN]
    },
    component: FullLayoutComponent, children: [
      {
        path: '',
        component: LogPanelComponent
      }
    ]
  },
  {
    path: 'prontuario',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Prontuário Eletrônico',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN, RolesEnum.ROLE_DOCTOR, RolesEnum.ROLE_NURSE]
    },
    component: FullLayoutComponent, children: [
      {
        path: '',
        component: ProntuarioEletronicoComponent
      }
    ]
  },
  {
    path: 'costumizacao',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Costumização do sistema',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN]
    },
    component: FullLayoutComponent, children: [
      {
        path: '',
        component: SystemCustomizationComponent
      }
    ]
  },
  {
    path: 'public', component: NoneLayoutComponent, children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: `**`, redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
