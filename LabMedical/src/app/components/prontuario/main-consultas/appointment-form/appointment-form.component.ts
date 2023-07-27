import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class AppointmentFormComponent implements OnInit {
	@ViewChild('appointmentForm') appointmentForm: NgForm | undefined;
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
		private appointmentsService: AppointmentsService) {}

	ngOnInit() {
		this.appointment.pacientId = this.patientId

		this.medicineService.getMedicines(this.patientId).subscribe({
			next: medications => this.patientMedications = medications.body,
			error: err => console.log(err)
		})
	}

	onAddAppointment() {
		console.log(this.appointment)


		this.appointmentsService.saveAppointment(this.appointment).subscribe({
			next: response => {
				console.log(response)

				this.modalService.createModal("Consulta cadastrada com sucesso", `Id da consulta: ${response}` )
			},
			error: err => console.log(err)
		})
	}

	onSaveAppointment() {
		console.log('editou')
	}

	onDeleteAppointment() {
		console.log('deletou')
	}
}
