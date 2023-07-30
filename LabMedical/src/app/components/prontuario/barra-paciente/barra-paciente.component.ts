import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MedicineService } from 'src/app/shared/services/medicine.service';
import { ActivatedRoute, Router } from "@angular/router";
import { PacientService } from "../../../shared/services/pacient.service";
import { Patient } from "../../../shared/models/patient.model";

@Component({
  selector: 'app-barra-paciente',
  templateUrl: './barra-paciente.component.html',
  styleUrls: ['./barra-paciente.component.css']
})
export class BarraPacienteComponent implements OnInit, OnDestroy {
	@Output('onPatientSelect') onPatientSelect = new EventEmitter<any>();

  IMAGEM_PADRAO = '../../../../../assets/user.png'

  idPaciente:number|null = null
	selectedPatientId: number;
  patients: Patient[];
  selectedPatient: Patient;

  constructor(
		private patientService:PacientService,
		private medicineService:MedicineService,
		private router: Router,
		private activatedRoute: ActivatedRoute){}


	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(params => {
			this.selectedPatientId = +params.get('patientId');
			localStorage.setItem('patientId', this.selectedPatientId.toString())

			if (this.selectedPatientId) {
				this.patientService.getPatient(this.selectedPatientId).subscribe({
					next: (patient: Patient) => {
						this.selectedPatient = patient;
					}
				})
			}
		})
	}

	ngOnDestroy() {
		localStorage.removeItem('patientId');
		this.selectedPatientId = null;
		this.onPatientSelect.emit(undefined)
	}

	getPatients(){
    this.patientService.getPatients().subscribe({
			next: (response) => {
				this.patients = response
			},
			error: (err) => {
				alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
				console.error({status: err.status, message: err.error})
			}
		})
  }

  onSelectPatient(idPaciente:number){
    this.router.navigate([`${idPaciente}/prontuario`])

	  this.patientService.getPatient(idPaciente).subscribe({
		  next: (patient: Patient) => {
				this.selectedPatient = patient;
			  this.router.navigate([`${idPaciente}/prontuario`])
		  }
	  })
  }

  resetarPaciente(){
    this.selectedPatientId = null
	  this.selectedPatient = null
	  localStorage.removeItem('patientId')

	  this.router.navigate(['/prontuario'])
  }

  filtrar(busca:string){
    if(busca==''){
      this.getPatients()
    }
    this.patients = this.patients.filter((paciente:any) =>paciente.name.toUpperCase().includes(busca.toUpperCase()))
  }
}
