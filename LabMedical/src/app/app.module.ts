import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './pages/home/home.component';
import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';
import { NoneLayoutComponent } from './shared/layouts/none-layout/none-layout.component';
import { MenuComponent } from "./shared/layouts/components/menu/menu.component";
import { ToolbarComponent } from "./shared/layouts/components/toolbar/toolbar.component";
import { DropDownMenuComponent } from "./shared/layouts/components/drop-down-menu/drop-down-menu.component";
import { TesteComponent } from './pages/teste/teste.component';
import { Teste2Component } from './pages/teste/teste2/teste2.component';
import {NgOptimizedImage} from "@angular/common";


import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './components/reset-password/reset-password-form/reset-password-form.component';
import { UserComponent } from './pages/user/user.component';
import { UsersTableComponent } from './components/registers/user/users-table/users-table.component';
import { UserRegisterFormComponent } from './components/registers/user/user-register-form/user-register-form.component';
import { ButtonFormsComponent } from './components/button-forms/button-forms.component';
import { LogPanelComponent } from './pages/log-panel/log-panel.component';
import { RolesEnumPipe } from './shared/pipes/roles-enum.pipe';
import { ProntuarioEletronicoComponent } from './pages/prontuario/prontuario-eletronico/prontuario-eletronico.component';
import { MainProntuarioComponent } from './components/prontuario/main-prontuario/main-prontuario.component';
import { BarraPacienteComponent } from './components/prontuario/barra-paciente/barra-paciente.component';
import { MenuProntuarioComponent } from './components/prontuario/menu-prontuario/menu-prontuario.component';
import { MainExamesComponent } from './components/prontuario/main-exames/main-exames.component';
import { MainConsultasComponent } from './components/prontuario/main-consultas/main-consultas.component';
import { MainMedicacaoComponent } from './components/prontuario/main-medicacao/main-medicacao.component';
import { MainDietasComponent } from './components/prontuario/main-dietas/main-dietas.component';
import { MainExerciciosComponent } from './components/prontuario/main-exercicios/main-exercicios.component';
import { CalculoIdadePipe } from './shared/pipes/calculo-idade.pipe';
import { SystemCustomizationComponent } from './pages/system-customization/system-customization.component';
import {provideToastr, ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { ModalComponent } from './components/modal/modal.component';
import { PacientFormComponent } from './pages/pacient-form/pacient-form.component';
import { ValidDobDirective } from "./shared/validators/date-of-birth/valid-dob.directive";
import { TesteListagemPacientesComponent } from './pages/teste-listagem-pacientes/teste-listagem-pacientes.component';
import { ExamTableComponent } from './components/registers/exam/exam-table/exam-table.component';
import { ExamFormComponent } from './components/registers/exam/exam-form/exam-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    LoginComponent,
    HomeComponent,
    SimpleModalComponent,
    FullLayoutComponent,
    NoneLayoutComponent,
    MenuComponent,
    ToolbarComponent,
    DropDownMenuComponent,
    TesteComponent,
    Teste2Component,
    SimpleModalComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    PacientFormComponent,
    ValidDobDirective,
    TesteListagemPacientesComponent,
    ResetPasswordFormComponent,
    UserComponent,
    UsersTableComponent,
    UserRegisterFormComponent,
    ButtonFormsComponent,
    LogPanelComponent,
    RolesEnumPipe,
    ProntuarioEletronicoComponent,
    MainProntuarioComponent,
    BarraPacienteComponent,
    MenuProntuarioComponent,
    MainExamesComponent,
    MainConsultasComponent,
    MainMedicacaoComponent,
    MainDietasComponent,
    MainExerciciosComponent,
    CalculoIdadePipe,
    SystemCustomizationComponent,
    ModalComponent,
    ExamTableComponent,
    ExamFormComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
