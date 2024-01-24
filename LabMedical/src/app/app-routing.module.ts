import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { NoneLayoutComponent } from "./shared/layouts/none-layout/none-layout.component";
import { FullLayoutComponent } from "./shared/layouts/full-layout/full-layout.component";
import { RolesEnum } from "./shared/enums/roles.enum";
import { RoleGuard } from "./shared/guards/role.guard";
import { UsersTableComponent } from './components/registers/user/users-table/users-table.component';
import { UserRegisterFormComponent } from './components/registers/user/user-register-form/user-register-form.component';
import { PacientFormComponent } from "./components/registers/patient/pacient-form/pacient-form.component";
import { LogPanelComponent } from "./pages/log-panel/log-panel.component";
import {
  ProntuarioEletronicoComponent
} from './pages/prontuario/prontuario-eletronico/prontuario-eletronico.component';
import { SystemCustomizationComponent } from "./pages/system-customization/system-customization.component";
import { MainConsultasComponent } from "./components/prontuario/main-consultas/main-consultas.component";
import {
  PatientNotSelectedComponent
} from "./pages/prontuario/prontuario-eletronico/patient-not-selected/patient-not-selected.component";
import { MainProntuarioComponent } from "./components/prontuario/main-prontuario/main-prontuario.component";
import {
  PatientSelectedComponent
} from "./pages/prontuario/prontuario-eletronico/patient-selected/patient-selected.component";
import { MainExamesComponent } from "./components/prontuario/main-exames/main-exames.component";
import { MainMedicacaoComponent } from "./components/prontuario/main-medicacao/main-medicacao.component";
import { MainDietasComponent } from "./components/prontuario/main-dietas/main-dietas.component";
import { MainExerciciosComponent } from "./components/prontuario/main-exercicios/main-exercicios.component";
import { PatientsTableComponent } from "./components/registers/patient/patients-list/patients-table.component";
import { FormExerciseComponent } from "./components/form-exercise/form-exercise.component";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/public/login']);

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    title: 'Estatísticas do Sistema',
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
  }, {
    path: 'pacientes',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Listagem de Pacientes',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN, RolesEnum.ROLE_DOCTOR, RolesEnum.ROLE_NURSE]
    },
    component: FullLayoutComponent, children: [
      {
        path: '', redirectTo: 'listar', pathMatch: 'full'
      },
      {
        path: 'listar',
        component: PatientsTableComponent
      },
      {
        path: 'cadastrar',
        component: PacientFormComponent
      },
      {
        path: 'editar/:id',
        component: PacientFormComponent
      }
    ]
  },
  {
    path: 'log/panel',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Logs do Sistema',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN, RolesEnum.ROLE_DOCTOR]
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
        component: ProntuarioEletronicoComponent,
        children: [{
          path: '',
          component: PatientNotSelectedComponent
        }]
      }
    ]
  },
  {
    path: ':patientId/prontuario',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Prontuário Eletrônico',
    data: {
      requiredRoles: [RolesEnum.ROLE_ADMIN, RolesEnum.ROLE_DOCTOR, RolesEnum.ROLE_NURSE]
    },
    component: FullLayoutComponent, children: [
      {
        path: '',
        component: ProntuarioEletronicoComponent,
        children: [
          {
            path: '',
            component: PatientSelectedComponent,
            children: [{
              path: '',
              component: MainProntuarioComponent
            }, {
              path: 'consultas',
              component: MainConsultasComponent
            }, {
              path: 'consultas/:idConsulta',
              component: MainConsultasComponent
            }, {
              path: 'exames',
              component: MainExamesComponent
            }, {
              path: 'exames/:idExame',
              component: MainExamesComponent
            }, {
              path: 'medicacao',
              component: MainMedicacaoComponent
            }, {
              path: 'medicacao/:idMedicacao',
              component: MainMedicacaoComponent
            }, {
              path: 'dietas',
              component: MainDietasComponent
            }, {
              path: 'dietas/:idDieta',
              component: MainDietasComponent
            }, {
              path: 'exercicios',
              component: MainExerciciosComponent
            }, {
              path: 'exercicios/:idExercicio',
              component: MainExerciciosComponent
            }]
          }
        ]

      }]
  },
  {
    path: 'costumizacao',
    canActivate: [AuthGuard, RoleGuard],
    title: 'Customização do Sistema',
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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: `**`, redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
