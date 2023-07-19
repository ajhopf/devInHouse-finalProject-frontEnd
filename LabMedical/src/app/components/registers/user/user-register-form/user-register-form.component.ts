import { UserService } from 'src/app/shared/services/user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent {
  user: UserModel = {}
  OBRIGATORIO: string = '../../../assets/images/obrigatorio.png' 
  @ViewChild('signIn') signInForm: NgForm;
  formValid: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  saveUser() {
    if(this.formValid){
      this.userService.saveUser(this.user).subscribe(({
        next:() =>{
          alert("Usuário salvo com sucesso!");
          this.cleanForm();
          this.formValid = false;
        },
        error: (err) => {
          alert(`Erro ao realizar cadastro. ${err.error}`);
          console.error({status: err.status, message: err.error});
        }
      }));
    }else{
      alert('O formulário não é válido, campos obrigatórios devem ser preenchidos. Não será realizado o salvamento do usuário.');
    };
  }

  validarFormulario() {
    this.formValid = this.signInForm.valid;
  }

  cleanForm() {
    this.user = {}
    this.signInForm.reset();
  }

  navigate() {
    this.router.navigateByUrl("usuarios/listar")
  }
}

