import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MedicineService } from 'src/app/shared/services/medicine.service';
import { Medicine } from 'src/app/shared/models/medicine.model';

@Component({
  selector: 'app-form-medicacao',
  templateUrl: './form-medicacao.component.html',
  styleUrls: ['./form-medicacao.component.css']
})
export class FormMedicacaoComponent {
  OBRIGATORIO = '../../../../../assets/images/obrigatorio.png'

  patientId:any = null
  medicine:any = Medicine()
  @Input() medicineId:any = ''
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

  constructor(private medicineService:MedicineService){}

  ngOnInit(): void {
    this.patientId = localStorage.getItem('patientId')
    if(this.medicineId !='' && this.medicineId!='-1'){
      this.setMedicine()
    }
    if(this.acao == 'edit'){
      this.disabledAdd = true
      this.disabledDelete = false
      this.disabledSave = false
    }
  }

  setMedicine(){
    let medicines:any
    this.medicineService.getMedicines(this.patientId).subscribe({
      next: (response) => {
        medicines = response.body
        this.medicine = medicines.filter((med:any) => med.id==this.medicineId)[0]
        this.dataAtual = `${this.medicine.medicineDate.slice(6,10)}-${this.medicine.medicineDate.slice(3,5)}-${this.medicine.medicineDate.slice(0,2)}`
        this.horaAtual = this.medicine.time
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }

  cadastrar(form:any,idSubmit:any){
    let campos = form.form.controls
    if (form.valid) {
      switch(idSubmit){
        case 'add':
          this.adicionar(campos)
          break
        case 'edit':
          this.salvar(campos,this.medicineId)
          break
        case 'delete':
          this.deletar(this.medicineId)
          break
      }
      this.voltar()
    } else {
      alert('Cadastro Inválido')
    }
  }

  adicionar(campos:any){
    this.medicineService.saveMedicine(campos,true).subscribe({
      next: () => {
        this.medicineService.getMedicines(this.patientId)
        alert('Consulta Cadastrada!')
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
    })
  }

  salvar(campos:any,medicineId:number){
    this.medicineService.updateMedicine(medicineId,campos, true).subscribe({
      next: () => {
        alert('Consulta Salva!')
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
    })
  }

  deletar(medicineId:number){
    this.medicineService.deleteMedicineById(medicineId).subscribe({
      next: () => {
        alert('Consulta Deletada!')
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
    })
  }

  voltar(){
    this.pageChangeOutput.emit('table')
  }
}
