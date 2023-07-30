import { Component, OnInit } from '@angular/core';
import { PatientService } from "../../../../shared/services/patient.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  patientList: any[] = []

  constructor(
    private pacientService: PatientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.pacientService.getPatients().subscribe({
      next: response => {
        this.patientList = response
      },
      error: err => {
        alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
        console.log({status: err.status, message: err.error})
      }
    })
  }

  search(filter: string) {
    if(filter.length == 0){
      console.log(filter.length)
      this.onLoad()
    } else{
      this.patientList = this.patientList.filter((patient:any) =>patient.name.toUpperCase().includes(filter.toUpperCase())|| patient.email?.includes(filter))
    }
  }

  onEditPatient(patientId: number) {
    this.router.navigate([`pacientes/editar/${patientId}`])
  }

  onAddPatient() {
    this.router.navigate([`pacientes/cadastrar`])
  }

}
