import { Component } from '@angular/core';
import { StatsService } from 'src/app/shared/services/stats.service';

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

  constructor(private statsService:StatsService){}

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
  }


}
