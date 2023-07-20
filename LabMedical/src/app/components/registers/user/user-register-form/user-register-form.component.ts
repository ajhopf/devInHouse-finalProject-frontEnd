import { UserService } from 'src/app/shared/services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent implements OnInit{
  user: UserModel = {}
  OBRIGATORIO: string = '../../../assets/images/obrigatorio.png' 
  @ViewChild('signIn') signInForm: NgForm;
  formValid: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getUserByID(this.route.snapshot.params['id']);
    } else {
      this.user = {};
    }
  }

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

  getUserByID(id: number) {
    this.fetchUser(id).subscribe({
			next: (response: any) => {
				this.user = response.body
			},
			error: (err) => {
				alert('Erro de solicitação de usuário')
				console.error({status: err.status, message: err.error})
			}
		})
  }

  fetchUser(id: number): Observable<any> {
		return this.userService.getUserById(id);
	}

  navigate() {
    this.router.navigateByUrl("usuarios/listar")
  }
}

