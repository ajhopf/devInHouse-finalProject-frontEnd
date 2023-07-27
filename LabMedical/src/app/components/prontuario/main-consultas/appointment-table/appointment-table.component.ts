import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from "../../../../shared/models/appointment.model";
import { AppointmentsService } from "../../../../shared/services/appointments.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent {
  @Input() patientsAppointments: Appointment[];
  @Output('editAppointment') editAppointment = new EventEmitter<any>();

  constructor(private appointmentService: AppointmentsService, private toastr: ToastrService) {  }


  onEditAppointment(appointmentId: number) {
    console.log(appointmentId)
    this.editAppointment.emit(appointmentId);
  }

  onDeactivateAppointment(appointment: Appointment) {
    appointment.isActive = !appointment.isActive;

    let toastrMessage: string;

    if (appointment.isActive) {
      toastrMessage = "Consulta reativada"
    } else {
      toastrMessage = "Consulta desativada"
    }

    this.appointmentService.updateAppointment(appointment.id, appointment).subscribe({
      next: () => {
        appointment.isActive ? this.toastr.success(toastrMessage) : this.toastr.warning(toastrMessage)
      },
      error: err => this.toastr.error(err.message)
    })
  }

}
