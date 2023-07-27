import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from "../../../../shared/models/appointment.model";
import { MedicineService } from "../../../../shared/services/medicine.service";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent {
  @Input() patientsAppointments: Appointment[];

}
