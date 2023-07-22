import { Component, Output, EventEmitter } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-barra-paciente',
  templateUrl: './barra-paciente.component.html',
  styleUrls: ['./barra-paciente.component.css']
})
export class BarraPacienteComponent {
  IMAGEM_PADRAO = '../../../../../assets/user.png'

  @Output() idPacienteOutput:EventEmitter<string|null> = new EventEmitter()

  idPaciente:string|null = null
  pacientes:any
  paciente:any

  constructor(private patientService:PatientService){}

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
    this.idPacienteOutput.emit(this.idPaciente)
    for(var patient of this.pacientes){
      if(patient.id==idPaciente){
        this.paciente = patient
      }
    }
  }

  resetarPaciente(){
    this.idPaciente = null
    this.idPacienteOutput.emit(this.idPaciente)
  }

  filtrar(busca:string){
    if(busca==''){
      this.getPacientes()
    }
    this.pacientes = this.pacientes.filter((paciente:any) =>paciente.name.toUpperCase().includes(busca.toUpperCase()))
  }
}
