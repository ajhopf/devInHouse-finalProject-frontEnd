import { Component } from '@angular/core';

@Component({
  selector: 'app-prontuario-eletronico',
  templateUrl: './prontuario-eletronico.component.html',
  styleUrls: ['./prontuario-eletronico.component.css']
})
export class ProntuarioEletronicoComponent {
  patientId: string;
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

  onPatientSelect(event: string): void {
    this.patientId = event;
  }
}
