import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./shared/guards/auth-guard.guard";
import {NoneLayoutComponent} from "./shared/layouts/none-layout/none-layout.component";
import {FullLayoutComponent} from "./shared/layouts/full-layout/full-layout.component";
import {TesteComponent} from "./pages/teste/teste.component";

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
    path: 'exemplo/router',
    canActivate: [AuthGuard],
    title: 'Exemplo Router',
    component: FullLayoutComponent, children: [
      {
        path:'',
        component: TesteComponent
      }
    ]
  },
  {
    path: 'exemplo/router2',
    canActivate: [AuthGuard],
    title: 'Exemplo Router 2',
    component: FullLayoutComponent, children: [
      {
        path:'',
        component: TesteComponent
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
