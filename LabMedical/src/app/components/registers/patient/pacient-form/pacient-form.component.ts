import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from "../../../../shared/services/patient.service";
import { Patient } from "../../../../shared/models/patient.model";
import { ViacepService } from "../../../../shared/services/viacep.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { RolesEnum } from "../../../../shared/enums/roles.enum";
import { CivilStatusEnum } from "../../../../shared/enums/civil-status.enum";
import { AppointmentsService } from "../../../../shared/services/appointments.service";
import { ToastrService } from "ngx-toastr";
import { ExamService } from "../../../../shared/services/exam.service";
import { MedicineService } from "../../../../shared/services/medicine.service";
import { DietService } from "../../../../shared/services/diet.service";
import { combineLatest } from "rxjs";

@Component({
	selector: 'app-pacient-form',
	templateUrl: './pacient-form.component.html',
	styleUrls: ['./pacient-form.component.css']
})
export class PacientFormComponent implements OnInit {
	@ViewChild('patientForm') newPacientForm: NgForm | undefined
	MANDATORY: string = "../../../assets/images/obrigatorio.png"
	pacientId: string = ''
	hasRecords: boolean = false
	civilStatusEnum = CivilStatusEnum;
	hasAlergies: boolean = true
	allergy: string = ''
	hasSpecialCare: boolean = true
	specialCare: string = ''
	pacient: Patient = {
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
		private pacientService: PatientService,
		private route: ActivatedRoute,
		private appointmentsService: AppointmentsService,
		private examService: ExamService,
		private medicineService: MedicineService,
		// private exerciseSerivce: ExerciseService,
		private dietService: DietService,
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.pacientId = this.route.snapshot.params['id']

		if (this.pacientId) {
			this.pacientService.getPatient(+this.pacientId).subscribe({
				next: (pacient: Patient) => {
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

			this.fetchRecords(+this.pacientId);
		}
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

	onSavePatient() {
		this.pacientId ? this.editPatient() : this.createPatient()
	}

	createPatient() {
		this.pacientService.createPatient(this.pacient).subscribe({
				next: response => {
					console.log(response)
					this.toastr.success('Paciente cadastrado com sucesso')
					this.navigateAway()
				},
				error: err => {
					console.error(err.error)
					this.toastr.error(err.error, 'Paciente não cadastrado')
				}
			}
		)
	}

	editPatient() {
		this.pacientService.editPatient(this.pacient).subscribe({
			next: response => {
				console.log(response)
				this.toastr.success('Registro de paciente editado com sucesso')
				this.navigateAway()
			},
			error: err => {
				console.log(err)
				this.toastr.error(err.error, 'Paciente não atualizado')
			}
		})
	}

	onDeleteRegistration() {
		if (!this.hasRecords) {
			this.pacientService.deletePatient(this.pacientId).subscribe(
				() => {
					this.toastr.success('Paciente deletado com sucesso')
					this.navigateAway()
				}
			)
		} else {
			this.toastr.error('Paciente possui registros. Não foi possível deletar o paciente.')
		}
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

	navigateAway() {
		this.router.navigateByUrl("pacientes/listar")
	}

	fetchRecords(pacientId: number) {
		let hasAppointments: boolean;
		let hasExams: boolean;
		let hasMedicines: boolean;
		let hasDiets: boolean;
		//let hasExercises: boolean;

		const appointment = this.appointmentsService.getAppointmentsByPacientId(pacientId);
		const exams = this.examService.getExamListById(pacientId);
		const medicines = this.medicineService.getMedicines(pacientId);
		const diets = this.dietService.getDietByPacientId(pacientId);
		// const exercises = this.exerciseService.getExercisesByPacientId(pacientId);

		combineLatest([appointment, medicines, diets, exams])
			.subscribe({
				next: ([appointment, medicines, diets, exams]) => {
					hasAppointments = appointment.length > 0;
					hasMedicines = medicines.body.length > 0;
					hasDiets = diets.length > 0;
					hasExams = exams.body.length > 0;

					if (hasAppointments || hasMedicines || hasDiets || hasExams) {
						this.hasRecords = true
					} else {
						this.hasRecords = false
					}
				},
				error: err => {console.log(err.error)}
			});
	}

}
