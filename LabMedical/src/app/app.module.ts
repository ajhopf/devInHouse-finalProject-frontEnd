import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
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


import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './components/reset-password/reset-password-form/reset-password-form.component';

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
    ResetPasswordFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
