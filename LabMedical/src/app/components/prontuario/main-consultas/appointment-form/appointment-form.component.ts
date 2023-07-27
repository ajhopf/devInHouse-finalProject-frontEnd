import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Appointment } from "../../../../shared/models/appointment.model";
import { NgForm } from "@angular/forms";
import { MedicationsService } from "../../../../shared/services/medications.service";
import { ModalService } from "../../../../shared/services/modal.service";
import { AppointmentsService } from "../../../../shared/services/appointments.service";
import { MedicineService } from "../../../../shared/services/medicine.service";

@Component({
	selector: 'app-appointment-form',
	templateUrl: './appointment-form.component.html',
	styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit{
	@ViewChild('appointmentForm') appointmentForm: NgForm | undefined;
	@Output('appointmentAddedSavedOrDeleted') appointmentAddedSavedOrDeleted = new EventEmitter<any>();
	@Input() patientId: number;
	@Input() appointmentForEdition: Appointment | undefined;
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
		private appointmentsService: AppointmentsService) {}

	ngOnInit() {
		this.appointment.pacientId = this.patientId

		this.medicineService.getMedicines(this.patientId).subscribe({
			next: medications => this.patientMedications = medications.body,
			error: err => console.log(err)
		})

		if(this.appointmentForEdition) {
			this.appointment = this.appointmentForEdition;
		}
	}

	onAddAppointment() {
		this.appointmentsService.addAppointment(this.appointment).subscribe({
			next: response => {
				this.appointmentAddedSavedOrDeleted.emit();
				this.appointmentForm.reset();
				this.modalService.createModal("Operação Realizada", `Consulta cadastrada com sucesso. Id da consulta: ${JSON.stringify(response.id)}`)
			},
			error: err => console.log(err)
		})

	}

	onSaveAppointment() {
		this.appointmentsService.updateAppointment(this.appointmentForEdition.id, this.appointment).subscribe({
			next: response => {
				this.appointmentAddedSavedOrDeleted.emit();
				this.appointmentForm.reset();
				this.appointmentForEdition = undefined;
				this.modalService.createModal("Operação Realizada", `Consulta editada com sucesso`)
			},
			error: err => console.log(err)
		})
	}

	onDeleteAppointment() {
		this.appointmentsService.deleteAppointment(this.appointmentForEdition.id).subscribe({
			next: response => {
				this.appointmentAddedSavedOrDeleted.emit();
				this.appointmentForm.reset();
				this.appointmentForEdition = undefined;
				this.modalService.createModal("Operação Realizada", `Consulta deletada com sucesso`)
			},
			error: err => console.log(err)
		})
	}
}
