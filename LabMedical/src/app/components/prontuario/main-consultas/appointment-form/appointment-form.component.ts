import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Appointment } from "../../../../shared/models/appointment.model";
import { NgForm } from "@angular/forms";
import { ModalService } from "../../../../shared/services/modal.service";
import { AppointmentsService } from "../../../../shared/services/appointments.service";
import { MedicineService } from "../../../../shared/services/medicine.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-appointment-form',
	templateUrl: './appointment-form.component.html',
	styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit{
	@ViewChild('appointmentForm') appointmentForm: NgForm | undefined;
	@Output('appointmentAddedSavedOrDeleted') appointmentAddedSavedOrDeleted = new EventEmitter<any>();
	@Input() patientId: number;
 	MANDATORY: string = "../../../assets/images/obrigatorio.png";
	appointmentId: number;
	patientMedications: any[]
	appointment: Appointment = {
		appointmentReason: '',
		appointmentDate: new Date().toISOString().slice(0, 10),
		time: new Date().toLocaleTimeString('pt-BR', {timeZone: 'America/Sao_Paulo'}).slice(0, 5),
		problemDescription: '',
		dosageAndPrecautions: '',
		isActive: true,
		pacientId: null,
		medicineId: null
	}

	constructor(
		private medicineService: MedicineService,
		private modalService: ModalService,
		private toastr: ToastrService,
		private appointmentsService: AppointmentsService,
		private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.appointment.pacientId = this.patientId

		this.medicineService.getMedicines(this.patientId).subscribe({
			next: medications => this.patientMedications = medications.body,
			error: err => console.log(err)
		})

		this.activatedRoute.paramMap.subscribe({
			next: params => {
				let appointmentIdFromParams = params.get('idConsulta')

				if (appointmentIdFromParams) {
					this.appointmentsService.getAppointmentsByPacientId(+this.patientId).subscribe({
						next: (appointments: Appointment[]) => {
							this.appointment = appointments.find(appointment => appointment.id == +appointmentIdFromParams)
							this.appointmentId = +appointmentIdFromParams
						},
						error: err => console.log(err)
					})
				}
			}
		})
	}

	onAddAppointment() {
		console.log(this.appointment)

		this.appointmentsService.addAppointment(this.appointment).subscribe({
			next: () => {
				this.appointmentAddedSavedOrDeleted.emit();
				this.appointmentForm.reset();
				this.toastr.success("Consulta cadastrada com sucesso.", "Operação Realizada")
			},
			error: err => {
				console.log(err)
				this.toastr.error("Consulta não cadastrada. Erro: " + err.message, "Operação não realizada")

			}
		})

	}

	onSaveAppointment() {
		this.appointmentsService.updateAppointment(this.appointment.id, this.appointment).subscribe({
			next: () => {
				this.appointmentAddedSavedOrDeleted.emit();
				this.appointmentForm.reset();
				this.toastr.success("Consulta editada com sucesso.", "Operação Realizada")
			},
			error: err => this.toastr.error("Consulta não atualizada. Erro: " + err.message, "Operação não realizada")
		})
	}

	onDeleteAppointment() {
		this.appointmentsService.deleteAppointment(this.appointmentId).subscribe({
			next: () => {
				this.appointmentAddedSavedOrDeleted.emit();
				this.appointmentForm.reset();
				this.toastr.success("Consulta deletada com sucesso.", "Operação Realizada")
			},
			error: err => this.toastr.error("Consulta não deletada. Erro: " + err.message, "Operação não realizada")
		})
	}
}
