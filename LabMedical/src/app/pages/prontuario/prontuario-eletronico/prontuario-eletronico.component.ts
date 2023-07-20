import { Component, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prontuario-eletronico',
  templateUrl: './prontuario-eletronico.component.html',
  styleUrls: ['./prontuario-eletronico.component.css']
})
export class ProntuarioEletronicoComponent {
  idPaciente: string | null = null
  pageProntuario = 'prontuario'
  exame: any
  consulta: any
  template = 'new'
  acao:string = ''

  setPageProntuario(page: string, template: string, id: string,acao:string) {
    this.pageProntuario = page
    this.template = template
    this.acao = acao
  }

  setIdPaciente(idPaciente: string | null) {
    this.idPaciente = idPaciente
  }
}
