import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent implements OnInit{
  @ViewChild('signIn') signInForm: NgForm;
  user: UserModel = {}
  OBRIGATORIO: string = '../../../assets/images/obrigatorio.png' 
  formValid: boolean = false;
  readOnly: boolean = false
  canDelete: boolean = false
  isEditing: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getUserByID(this.route.snapshot.params['id']);
      this.isEditing = true;
    } else {
      this.user = {};
    }
  }

  saveUser() {
    if(this.formValid){
      if(this.isEditing){
        const newUser = {
          name: this.user.name,
          gender: this.user.gender,
          cpf: this.user.cpf,
          telephone: this.user.telephone,
          email: this.user.email,
          password: this.user.password,
          photoUrl: this.user.photoUrl,
          role: this.user.role,
        }
        this.userService.updateUser(this.user.id, newUser).subscribe(({
          next: (response:string) => {
            this.toastr.success(response);
            this.navigate()
          },
          error: (err: HttpErrorResponse) => {
            this.toastr.error(`${err.error}`);
          }        
        }));
      }else{
        this.userService.saveUser(this.user).subscribe(({
          next:() =>{
            this.toastr.success("Usuário salvo com sucesso!");
            this.cleanForm();
            this.formValid = false;
          },
          error: (err) => {
            this.toastr.error(`Erro ao realizar cadastro. ${err.error}`);
            console.error({status: err.status, message: err.error});
          }
        }));
      }
    }else{
      this.toastr.error('O formulário não é válido, campos obrigatórios devem ser preenchidos. Não será realizado o salvamento do usuário.');
    };
  }

  validForm() {
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
        this.readOnly = true
        this.canDelete = true
			},
			error: (err) => {
				this.toastr.error('Erro de solicitação de usuário')
				console.error({status: err.status, message: err.error})
			}
		})
  }

  fetchUser(id: number): Observable<any> {
		return this.userService.getUserById(id);
	}

  deleteUser(id: number){
    this.userService.deleteUserById(id).subscribe(({
      next: (response: string) =>{
        this.toastr.success(response)
        this.navigate()
      },
      error: (err) =>{
        this.toastr.error(err)
      }
    }))
  }

  navigate() {
    this.router.navigateByUrl("usuarios/listar")
  }
  
}