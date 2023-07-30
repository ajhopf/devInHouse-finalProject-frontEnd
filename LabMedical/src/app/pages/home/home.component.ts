import { Component } from '@angular/core';
import { StatsService } from 'src/app/shared/services/stats.service';
import { PacientService } from "../../shared/services/pacient.service";
import { Router } from "@angular/router";
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  qtPatients:number
  qtUsers:number
  qtAppointments:number
  qtExams:number
  qtMedicines:number
  qtDiets:number
  qtExercises:number
  userRole:any
  pacientList: any[] = []
  userList:any[] = []

  constructor(private statsService:StatsService, private pacientService: PacientService,private userService:UserService,private router: Router){}

  ngOnInit(){
    this.userRole = JSON.parse(localStorage.getItem('session')).role 
    this.statsService.getStats().subscribe({
      next: (response) => {
        this.qtAppointments = response.body.qtAppointments
        this.qtDiets = response.body.qtDiets
        this.qtExams = response.body.qtExams
        this.qtExercises = response.body.qtExercises
        this.qtMedicines = response.body.qtMedicines
        this.qtPatients = response.body.qtPatients
        this.qtUsers = response.body.qtUsers
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
    })
    this.getPatients()
    this.getUsers()
  }

  getPatients(){
    this.pacientService.getPatients().subscribe({
      next: response => {
        this.pacientList = response
      },
      error: error => console.log(error)
    })
  }

  getUsers(){
    this.userService.getUsersList().subscribe({
      next: response =>{
        this.userList = response.body
        console.log(this.userList)
      },
      error: error => console.log(error)
    })
  }

  onSeePatient(id: number) {
    this.router.navigate([`home/pacient-form/${id}`])
  }

  onSeeUser(id:number){
    this.router.navigate([`usuarios/buscar/${id}`])
  }

  filtrarPaciente(busca:string){
    if(busca==''){
      this.getPatients()
    }
    this.pacientList = this.pacientList.filter((paciente:any) =>paciente.name.toUpperCase().includes(busca.toUpperCase()))
  }

  filtrarUser(busca:string){
    if(busca==''){
      this.getUsers()
    }
    this.userList = this.userList.filter((user:any) =>user.name.toUpperCase().includes(busca.toUpperCase()))
  }


}
