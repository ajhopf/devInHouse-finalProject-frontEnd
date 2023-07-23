import { Component, OnInit, ViewChild } from '@angular/core';
import { PacientService } from "../../shared/services/pacient.service";
import { Pacient } from "../../shared/models/pacient.model";
import { ViacepService } from "../../shared/services/viacep.service";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { RolesEnum } from "../../shared/enums/roles.enum";
import { CivilStatusEnum } from "../../shared/enums/civil-status.enum";
import { AppointmentsService } from "../../shared/services/appointments.service";

@Component({
	selector: 'app-pacient-form',
	templateUrl: './pacient-form.component.html',
	styleUrls: ['./pacient-form.component.css']
})
export class PacientFormComponent implements OnInit {
	@ViewChild('newPacient') newPacientForm: NgForm | undefined
	MANDATORY: string = "../../../assets/images/obrigatorio.png"
	pacientId: string = ''
	hasRecords: boolean = false
	civilStatusEnum = CivilStatusEnum;
	hasAlergies: boolean = true
	allergy: string = ''
	hasSpecialCare: boolean = true
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
		private appointmentsService: AppointmentsService
		// private examsDB: ExamsDbService,
	) {}

	ngOnInit(): void {
		this.pacientId = this.route.snapshot.params['id']

		if (this.pacientId) {
			this.pacientService.getPacient(+this.pacientId).subscribe({
				next: (pacient: Pacient) => {
					this.pacient = pacient
					this.pacient.alergies?.length && this.pacient.alergies.length > 0 ? this.hasAlergies = true : ''
					this.pacient.specialCare?.length && this.pacient.specialCare.length > 0 ? this.hasSpecialCare = true : ''
				},
				error: err => console.log(err)
			})

			this.appointmentsService.getAppointmentsByPacientId(+this.pacientId).subscribe(
				(appointments: any[]) => {
					if (appointments.length > 0) {
						this.hasRecords = true
					}
				}
			)
		}


		//
		// this.examsDB.getExamsByPacientId(this.userId).subscribe(
		//   (exams: Exam[] ) => {
		//     if (exams.length > 0) {
		//       this.hasRecords = true
		//     }
		//   }
		// )
	}

	onChangeHasAlergies(e: any) {
		this.hasAlergies = e.target.value == "yes";
	}

	onAddAllergy(allergy: string) {
		this.pacient.alergies?.push(allergy);
		this.allergy = ''
	}

	onRemoveAllergy(index: number) {
		this.pacient.alergies?.splice(index, 1)
	}

	onChangeHasSpecialCare(e: any) {
		this.hasSpecialCare = e.target.value == "yes";
	}

	onAddSpecialCare(specialCare: string) {
		this.pacient.specialCare?.push(specialCare)
		this.specialCare = ''
	}

	onRemoveSpecialCare(index: number) {
		this.pacient.specialCare?.splice(index, 1)
	}

	onCreatePacient() {
		this.pacientService.createPacient(this.pacient).subscribe({
				next: response => {
					console.log(response)
					alert('Paciente cadastrado com sucesso')
				},
				error: err => {
					console.error(err.error)
					alert('Paciente não cadastrado. Erro: ' + err.error)
				}
			}
		)
	}

	onEditRegistration() {
		this.pacientService.editPacient(this.pacient).subscribe({
			next: response => {
				console.log(response)
				alert('Paciente atualizado com sucesso')
			},
			error: err => {
				console.log(err)
				alert('Paciente não atualizado. Erro: ' + err.error)
			}
		})
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
			this.pacient.address.cep = pacientCep.substring(0, 5) + '-' + pacientCep.substring(5)
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
