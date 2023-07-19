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
import { UsersTableComponent } from './components/registers/user/users-table/users-table.component';
import { UserRegisterFormComponent } from './components/registers/user/user-register-form/user-register-form.component';

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
    title: 'usuarios',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN]
    },
    component: FullLayoutComponent, children: [
      {
        path: 'listar',
        component: UsersTableComponent
      },
      {
        path: 'cadastrar',
        component: UserRegisterFormComponent
      }
    ]
  },
  {
    path: 'exemplo/router',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Exemplo Router',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN, RolesEnum.ROLE_DOCTOR]
    },
    component: FullLayoutComponent, children: [
      {
        path:'',
        component: TesteComponent
      }
    ]
  },
  {
    path: 'exemplo/router2',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Exemplo Router 2',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN]
    },
    component: FullLayoutComponent, children: [
      {
        path:'',
        component: Teste2Component
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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: `**`, redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
