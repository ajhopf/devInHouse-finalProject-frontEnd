import { Component, ViewChild } from '@angular/core';
import { PacientService } from "../../shared/services/pacient.service";
import { Pacient } from "../../shared/models/pacient.model";
import { ViacepService } from "../../shared/services/viacep.service";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { RolesEnum } from "../../shared/enums/roles.enum";
import { CivilStatusEnum } from "../../shared/enums/civil-status.enum";

@Component({
	selector: 'app-pacient-form',
	templateUrl: './pacient-form.component.html',
	styleUrls: ['./pacient-form.component.css']
})
export class PacientFormComponent {
	@ViewChild('newPacient') newPacientForm: NgForm | undefined
	pacientId: string = ''
	hasRecords: boolean = false
	civilStatusEnum = CivilStatusEnum;
	hasAlergies: boolean = false
	allergy: string = ''
	hasSpecialCare: boolean = false
	specialCare: string = ''
	pacient: Pacient = {
		name: '',
		gender: 'feminino',
		dob: new Date().toISOString().slice(0, 10),
		cpf: '',
		rg: '',
		civilStatus: this.civilStatusEnum.CIVIL_STATUS_SINGLE,
		phone: '',
		email: '',
		nationality: '',
		emergencyContact: '',
		alergies: [],
		specialCare: [],
		healthInsurance: '',
		healthInsuranceNumber: '',
		healthInsuranceExpirationDate: '',
		address: {
			cep: '',
			city: '',
			state: '',
			street: '',
			houseNumber: '',
			complement: '',
			district: '',
			referencePoint: ''
		},
		role: RolesEnum.ROLE_PATIENT,
		isActive: true
	}

	constructor(
		private viacep: ViacepService,
		private pacientService: PacientService,
		private route: ActivatedRoute,
		// private appointmentsDB: AppointmentsDbService,
		// private examsDB: ExamsDbService,
	) {}

	ngOnInit():void {
		this.pacientId = this.route.snapshot.params['id']

		if (this.pacientId) {
			this.pacientService.getPacient(+this.pacientId).subscribe((pacient: Pacient) => {
				this.pacient = pacient
			})}

			// this.appointmentsDB.getAppointmentsByUserId(this.userId).subscribe(
			//   (appointments: Appointment[]) => {
			//     if (appointments.length > 0) {
			//       this.hasRecords = true
			//     }
			//   }
			// )
			//
			// this.examsDB.getExamsByPacientId(this.userId).subscribe(
			//   (exams: Exam[] ) => {
			//     if (exams.length > 0) {
			//       this.hasRecords = true
			//     }
			//   }
			// )
		}

	onChangeHasAlergies(e: any){
		if (e.target.value == "yes") {
			this.hasAlergies = true
		} else {
			this.hasAlergies = false
		}
	}

	onAddAllergy(allergy: string) {
		this.pacient.alergies?.push(allergy);
		this.allergy = ''
	}

	onRemoveAllergy(index: number) {
		this.pacient.alergies?.splice(index, 1)
	}

	onChangeHasSpecialCare(e: any) {
		if (e.target.value == "yes") {
			this.hasSpecialCare = true
		} else {
			this.hasSpecialCare = false
		}
	}

	onAddSpecialCare(specialCare: string) {
		this.pacient.specialCare?.push(specialCare)
		this.specialCare = ''
	}

	onRemoveSpecialCare(index: number) {
		this.pacient.specialCare?.splice(index, 1)
	}

	onCreatePacient() {
		console.log(this.pacient)

		this.pacientService.createPacient(this.pacient).subscribe({
			next: response => console.log(response),
			error: err => console.error(err)
			}
		)
	}

	onEditRegistration() {
		console.log('editou')
	}

	onDeleteRegistration() {
		console.log('deletou')
	}

	formatCpf(): void {
		let pacientCpf = this.pacient.cpf

		if (pacientCpf.length === 11 && pacientCpf.match(/^\d{11}$/)
		) {
			this.pacient.cpf = pacientCpf.substring(0, 3) + '.' + pacientCpf.substring(3, 6) + '.' + pacientCpf.substring(6, 9) + '-' + pacientCpf.substring(9)
		}
	}

	formatCep(): void {
		let pacientCep = this.pacient.address.cep

		if (!pacientCep.includes('-')) {
			this.pacient.address.cep = pacientCep.substring(0,5) + '-' + pacientCep.substring(5)
		}
	}

	getAdress(): void {
		this.formatCep()

		let cepWithoutTrace = this.pacient.address.cep.replace('-', '')

		this.viacep.getAddress(+cepWithoutTrace)
			.subscribe(
				address => {
					this.pacient.address.city = address['localidade']
					this.pacient.address.state = address['uf']
					this.pacient.address.street = address['logradouro']
					this.pacient.address.district = address['bairro']
					console.log(this.pacient.address.cep)
				},
				error => {
					console.error(error.message)
					alert('CEP inválido!')
				})
	}
}
