import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from "../../../shared/services/appointments.service";
import { Appointment } from "../../../shared/models/appointment.model";
import { PatientService } from "../../../shared/services/patient.service";
import { Patient } from "../../../shared/models/patient.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-main-consultas',
  templateUrl: './main-consultas.component.html',
  styleUrls: ['./main-consultas.component.css']
})
export class MainConsultasComponent implements OnInit {
  patientId: string;
  showPatientAppointments: boolean = true;
  patientName: string;
  patientsAppointments: Appointment[];

  constructor(
    private appointmentsService: AppointmentsService,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    let url = this.router.url;
    let indexOfSecondBar = url.split("/", 2).join("/").length;
    this.patientId = url.substring(1, indexOfSecondBar);
    if (this.patientId != undefined || this.patientId != null) {
      this.patientService.getPatient(+this.patientId).subscribe({
        next: (patient: Patient) => {
          this.patientName = patient.name;
        },
        error: () => alert("Erro ao buscar paciente com o id " + this.patientId)
      })
      this.onAppointmentAddedSavedOrDeleted()
    }

    this.activatedRoute.paramMap.subscribe({
      next: params => {
        let idConsulta = params.get('idConsulta');

        if (idConsulta) {
          this.showPatientAppointments = false;
        }
      }
    })
  }

  onAddNewAppointment() {
    this.showPatientAppointments = false;
  }

  onReturn() {
    this.router.navigate([`${this.patientId}/prontuario/consultas`])
  }

  onAppointmentAddedSavedOrDeleted() {
    this.showPatientAppointments = true;

    this.appointmentsService.getAppointmentsByPacientId(+this.patientId).subscribe({
      next: (value: Appointment[]) => {
        this.patientsAppointments = value;
      },
      error: err => console.log(err)
    })
  }
}
