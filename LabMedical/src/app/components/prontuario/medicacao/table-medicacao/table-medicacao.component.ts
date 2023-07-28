import { Component, Input,Output, EventEmitter } from '@angular/core';
import { MedicineService } from 'src/app/shared/services/medicine.service';

@Component({
  selector: 'app-table-medicacao',
  templateUrl: './table-medicacao.component.html',
  styleUrls: ['./table-medicacao.component.css']
})
export class TableMedicacaoComponent {
  @Output() pageOutput: EventEmitter<string> = new EventEmitter()
  patientId:any = null
  medicines: any

  constructor(private medicineService:MedicineService) { }

  ngOnInit() {
    this.patientId = JSON.parse(localStorage.getItem('patientId'))
    this.getMedicines()
    if (this.medicines)
      this.medicines.sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime())
  }

  abrir(id: string) {
    this.pageOutput.emit(id)
  }

  inativar(id:number){
    let inactivate = confirm('Deseja inativar o registro?')
    if(inactivate){

      let medicine = this.medicines.filter((med:any) => med.id==id)[0]
      medicine.status = false
      medicine.medicineDate = `${medicine.medicineDate.slice(6,10)}-${medicine.medicineDate.slice(3,5)}-${medicine.medicineDate.slice(0,2)}`
      this.medicineService.inactivateMedicine(id,medicine).subscribe({
        next: () => {
          alert('Consulta Inativada!')
        },
        error: (err) => {
          alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
          console.error({status: err.status, message: err.error})
        }
      })
    }
  }

  getMedicines(){
    this.medicineService.getMedicines(this.patientId).subscribe({
      next: (response) => {
        this.medicines = response.body
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }

}
