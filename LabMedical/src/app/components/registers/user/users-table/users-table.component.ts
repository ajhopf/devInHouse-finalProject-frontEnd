import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: UserModel[] =[]
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService){
    
  }

  ngOnInit(): void {
    this.onLoad()
  }
  
	onLoad() {
		this.fetchUser().subscribe({
			next: (response: any) => {
				this.users = response.body
			},
			error: (err) => {
				this.toastr.error('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }
	

	fetchUser(): Observable<any> {
		return this.userService.getUsersList();
	}
  abrir(){

  }

  search(filter: string) {
    if(filter.length == 0){
      console.log(filter.length)
      this.onLoad()
    } else{
      this.users = this.users.filter((user:any) =>user.name.toUpperCase().includes(filter.toUpperCase())|| user.email?.includes(filter))
    }
  }
  
  editNavigate(id: number){
      this.router.navigateByUrl(`usuarios/buscar/${id}`)
  }

  registerNavigate(){
    this.router.navigateByUrl(`usuarios/cadastrar`)
}


  
}