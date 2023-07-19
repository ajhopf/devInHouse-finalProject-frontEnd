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
  pacientes: UserModel[] =[]
  constructor(private userService: UserService, private router: Router){
    
  }

  ngOnInit(): void {
    this.onLoad()
  }
  
	onLoad() {
		this.fetchUser().subscribe({
			next: (response: any) => {
				this.pacientes = response.body
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }
	

	fetchUser(): Observable<any> {
		return this.userService.getUsersList();
	}
  abrir(){

  }

  filtrar(){

  }
  
  navegate(){
    this.router.navigateByUrl("usuarios/cadastrar")
  }

  
}
