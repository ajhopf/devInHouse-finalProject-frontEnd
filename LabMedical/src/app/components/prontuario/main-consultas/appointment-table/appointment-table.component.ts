import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from "../../../../shared/models/appointment.model";
import { MedicineService } from "../../../../shared/services/medicine.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent {
  @Input() patientsAppointments: Appointment[];
  @Output('editAppointment') editAppointment = new EventEmitter<any>();

  constructor(private router: Router) {  }


  onEditAppointment(appointmentId: number) {
    console.log(appointmentId)
    this.editAppointment.emit(appointmentId);
  }

}
