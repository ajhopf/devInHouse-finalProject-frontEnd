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

  getMedicines(){
    this.medicineService.getMedicines(this.patientId).subscribe({
      next: (response) => {
        console.log(response.body)
        this.medicines = response.body
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }

}
