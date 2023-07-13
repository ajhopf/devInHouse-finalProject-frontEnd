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

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    LoginComponent,
    HomeComponent,
    SimpleModalComponent
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
