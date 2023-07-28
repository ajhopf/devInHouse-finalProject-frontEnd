import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentsService } from "../../../shared/services/appointments.service";
import { Appointment } from "../../../shared/models/appointment.model";
import { PacientService } from "../../../shared/services/pacient.service";
import { Patient } from "../../../shared/models/patient.model";

@Component({
  selector: 'app-main-consultas',
  templateUrl: './main-consultas.component.html',
  styleUrls: ['./main-consultas.component.css']
})
export class MainConsultasComponent implements OnChanges {
  @Input('patientId') patientId: string;
  showPatientAppointments: boolean = true;
  patientName: string;
  patientsAppointments: Appointment[];
  appointmentForEdition: Appointment;

  constructor(
    private appointmentsService: AppointmentsService,
    private patientService: PacientService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.patientId != undefined || this.patientId != null) {
      this.patientService.getPatient(+this.patientId).subscribe({
        next: (patient: Patient) => {
          this.patientName = patient.name;
        },
        error: err => alert("Erro ao buscar paciente com o id " + this.patientId)
      })

     this.onAppointmentAddedSavedOrDeleted();
    }
  }

  onAddNewAppointment() {
    this.showPatientAppointments = false;
  }

  onReturn() {
    this.showPatientAppointments = true;
    this.appointmentForEdition = undefined;
  }

  onAppointmentAddedSavedOrDeleted() {
    this.showPatientAppointments = true;
    this.appointmentForEdition = undefined;

    this.appointmentsService.getAppointmentsByPacientId(+this.patientId).subscribe({
      next: (value: Appointment[]) => {
        this.patientsAppointments = value;
      },
      error: err => console.log(err)
    })
  }

  onEditAppointmentId(appointmentId: number) {
    this.appointmentForEdition = this.patientsAppointments.find(appointment => appointment.id == appointmentId)
  }

}
