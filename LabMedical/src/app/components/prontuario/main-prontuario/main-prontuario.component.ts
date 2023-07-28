import { Component, Input, OnInit } from '@angular/core';
import { Patient } from "../../../shared/models/patient.model";
import { PacientService } from "../../../shared/services/pacient.service";
import { AppointmentsService } from "../../../shared/services/appointments.service";
import { Appointment } from "../../../shared/models/appointment.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamService } from "../../../shared/services/exam.service";
import { ExamModel } from "../../../shared/models/exam.model";
import { MedicineService } from "../../../shared/services/medicine.service";

@Component({
	selector: 'app-main-prontuario',
	templateUrl: './main-prontuario.component.html',
	styleUrls: ['./main-prontuario.component.css']
})
export class MainProntuarioComponent implements OnInit {
	@Input('patientId') patientId: string;
	ANEXO: string = '../../../assets/images/document.png'
	patient: Patient;
	patientAppointments: Appointment[];
	emptyAppointments: boolean = false;
	patientExams: ExamModel[];
	emptyExams: boolean = false;
	patientMedications: any;
	emptyMedications: boolean = false;
	emptyDiets: boolean = true;
	emptyExercises: boolean = true;

	constructor(
		private patientService: PacientService,
		private appointmentsService: AppointmentsService,
		private examsService: ExamService,
		private medicationService: MedicineService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe(params => {
				this.patientId = params.get('patientId')

				if (this.patientId != undefined || this.patientId != null) {
					this.patientService.getPatient(+this.patientId).subscribe({
						next: (patient: Patient) => {
							this.patient = patient;
						},
						error: () => alert("Erro ao buscar paciente com o id " + this.patientId)
					})

					this.appointmentsService.getAppointmentsByPacientId(+this.patientId)
						.subscribe((appointments: Appointment[]) => {
							this.patientAppointments = appointments
							this.patientAppointments.length == 0 ? this.emptyAppointments = true : ''
						})

					this.examsService.getExamListById(+this.patientId)
						.subscribe({
							next: (exams: any) => this.patientExams = exams.body,
							error: () => { console.log('aqui'); this.emptyExams = true}
						})

					this.medicationService.getMedicines(+this.patientId)
						.subscribe(medications => {
							this.patientMedications = medications.body
							this.patientMedications.length == 0 ? this.emptyMedications = true : ''
						})
				}
			}
		)
	}

	accessAppointment(appointment: Appointment) {
		this.router.navigate([`${ this.patientId }/prontuario/consultas/${ appointment.id }`])
	}

	accessExam(exam: ExamModel) {
		this.router.navigate([`${ this.patientId }/prontuario/exames/${ exam.id }`])
	}

	accessMedication(medication: any) {
		this.router.navigate([`${this.patientId}/prontuario/${medication.id}`])
	}

}
