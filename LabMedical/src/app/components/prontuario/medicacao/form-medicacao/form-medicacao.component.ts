import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-medicacao',
  templateUrl: './form-medicacao.component.html',
  styleUrls: ['./form-medicacao.component.css']
})
export class FormMedicacaoComponent {
  OBRIGATORIO = '../../../../../assets/images/obrigatorio.png'

  pacientId:any = null
  @Input() consulta:any = ''
  @Input() acao:string = ''
  @Output() pageChangeOutput:EventEmitter<string> = new EventEmitter()
  disabledAdd = false
  disabledSave = true
  disabledDelete = true

  mesAtual = new Date().getMonth()+1
  diaAtual = new Date().getDate()
  dataAtual = `${new Date().getFullYear()}-${this.mesAtual.toString().length==1?'0'+this.mesAtual:this.mesAtual}-${this.diaAtual.toString().length==1?'0'+this.diaAtual:this.diaAtual}`

  minutoAtual = new Date().getMinutes()
  hora = new Date().getHours()
  horaAtual = `${this.hora.toString().length==1?'0'+this.hora:this.hora}:${this.minutoAtual.toString().length==1?'0'+this.minutoAtual:this.minutoAtual}`

  constructor(){}

  ngOnInit(): void {
    this.consulta?this.dataAtual = this.consulta.data:''
    this.consulta?this.horaAtual = this.consulta.hora:''
    if(this.acao == 'edit'){
      this.disabledAdd = true
      this.disabledDelete = false
      this.disabledSave = false
    }
  }

  cadastrar(form:any,idSubmit:any){
    let campos = form.form.controls
    if (form.valid) {
      switch(idSubmit){
        case 'add':
          this.adicionar(campos)
          break
        case 'edit':
          this.salvar(campos,this.consulta.ID)
          break
        case 'delete':
          this.deletar(campos,this.consulta.ID)
          break
      }
      this.voltar()
    } else {
      alert('Cadastro Inválido')
    }
  }

  adicionar(campos:any){
    /*let newConsulta = consultaFactory(campos,0,this.idPaciente)
    this.cadConsultaService.cadastrarConsulta(newConsulta)*/
    alert('Consulta Cadastrada!')
  }

  salvar(campos:any,idConsulta:number){
    /*let newConsulta = consultaFactory(campos,idConsulta,this.idPaciente)
    this.cadConsultaService.editarConsulta(newConsulta)*/
    alert('Consulta Salva!')
  }

  deletar(campos:any,idConsulta:number){
    /*let newConsulta = consultaFactory(campos,idConsulta, this.idPaciente)
    this.cadConsultaService.deletarConsulta(newConsulta)*/
    alert('Consulta Deletada!')
  }

  voltar(){
    this.pageChangeOutput.emit('table')
  }
}
