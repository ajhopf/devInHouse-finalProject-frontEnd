import { Component, OnDestroy } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-barra-paciente',
  templateUrl: './barra-paciente.component.html',
  styleUrls: ['./barra-paciente.component.css']
})
export class BarraPacienteComponent implements OnDestroy {
  IMAGEM_PADRAO = '../../../../../assets/user.png'

  idPaciente:string|null = null
  pacientes:any
  paciente:any

  constructor(private patientService:PatientService){}

	ngOnDestroy() {
		localStorage.removeItem('patientId');
	}

	getPacientes(){
    this.patientService.getPatientes().subscribe({
			next: (response) => {
        console.log(response.body)
				this.pacientes = response.body
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }

  onSubmit(idPaciente:string){
    this.idPaciente = idPaciente
    localStorage.setItem('patientId',this.idPaciente)
    for(var patient of this.pacientes){
      if(patient.id==idPaciente){
        this.paciente = patient
      }
    }
  }

  resetarPaciente(){
    this.idPaciente = null
    localStorage.setItem('patientId',null)
  }

  filtrar(busca:string){
    if(busca==''){
      this.getPacientes()
    }
    this.pacientes = this.pacientes.filter((paciente:any) =>paciente.name.toUpperCase().includes(busca.toUpperCase()))
  }
}
