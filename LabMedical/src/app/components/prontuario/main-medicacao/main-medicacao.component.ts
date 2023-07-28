import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-medicacao',
  templateUrl: './main-medicacao.component.html',
  styleUrls: ['./main-medicacao.component.css']
})
export class MainMedicacaoComponent {

  patientId:any = 'null'
  @Input() template: string = 'table'
  @Input() medicineId: any
  @Input() acao: string = ''

  ngOnInit(){
    this.patientId = localStorage.getItem('patientId')
  }

  changeTemplate(template: string, medicineId: string, acao: string) {
    this.template = template
    this.medicineId = medicineId
    this.acao = acao?acao:this.acao
  }

}
