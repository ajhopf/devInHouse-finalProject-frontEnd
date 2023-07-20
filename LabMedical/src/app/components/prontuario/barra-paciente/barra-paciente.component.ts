import { Component, Output, EventEmitter } from '@angular/core';

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

  //constructor(private cadPacienteService:CadastroPacienteService){}
  
  /*ngOnInit(){
    this.setPacientes()
  }

  setPacientes(){
    let pacientesJSON = this.cadPacienteService.getPacientes()
    if(pacientesJSON){
      this.pacientes = JSON.parse(pacientesJSON)
    }
  }*/

  onSubmit(idPaciente:string){
    this.idPaciente = idPaciente
    this.idPacienteOutput.emit(this.idPaciente)
    //this.paciente = this.cadPacienteService.getPaciente(this.idPaciente)
  }

  resetarPaciente(){
    this.idPaciente = null
    this.idPacienteOutput.emit(this.idPaciente)
  }

  /*filtrar(busca:string){
    this.setPacientes()
    this.pacientes = this.pacientes.filter((paciente:any) =>paciente.nome.toUpperCase().includes(busca.toUpperCase())||paciente.ID == busca)
  }*/
}
