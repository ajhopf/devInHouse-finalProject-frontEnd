import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from "../../../shared/models/patient.model";
import { PacientService } from "../../../shared/services/pacient.service";
import { AppointmentsService } from "../../../shared/services/appointments.service";
import { Appointment } from "../../../shared/models/appointment.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-main-prontuario',
  templateUrl: './main-prontuario.component.html',
  styleUrls: ['./main-prontuario.component.css']
})
export class MainProntuarioComponent implements OnInit {
  @Input('patientId') patientId: string;
  @Output('appointmentAccess') appointmentAccess = new EventEmitter<any>();
  patient: Patient;
  patientAppointments: Appointment[];

  constructor(
    private patientService: PacientService,
    private appointmentsService: AppointmentsService,
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

        this.appointmentsService.getAppointmentsByPacientId(+this.patientId).subscribe({
          next: (appointments: Appointment[]) => {
            this.patientAppointments = appointments;
          },
          error: err => alert(err)
        })
      }
    })
  }

  accessAppointment(appointment: Appointment) {
    this.router.navigate([`${this.patientId}/prontuario/consultas/${appointment.id}`])
    this.appointmentAccess.emit(appointment);
  }

}
