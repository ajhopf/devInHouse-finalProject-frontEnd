import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-main-medicacao',
  templateUrl: './main-medicacao.component.html',
  styleUrls: ['./main-medicacao.component.css']
})
export class MainMedicacaoComponent {

  @Input() patientId:any = 'null'
  @Input() template: string = 'table'
  @Input() medicineId: any
  @Input() acao: string = ''

  constructor(private router: Router, private route:ActivatedRoute){}

  ngOnInit(){
    let url = this.router.url;
    let indexOfSecondBar = url.split("/", 2).join("/").length;
    this.patientId = url.substring(1, indexOfSecondBar);
    let idMedicacaoRoute = this.route.snapshot.params['idMedicacao']
    if(idMedicacaoRoute)
    this.changeTemplate('form',idMedicacaoRoute,'edit')
  }

  changeTemplate(template: string, medicineId: string, acao: string) {
    this.template = template
    this.medicineId = medicineId
    this.acao = acao?acao:this.acao
  }

}
