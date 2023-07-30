import { Component, OnInit } from '@angular/core';
import { PatientService } from "../../../../shared/services/patient.service";
import { Router } from "@angular/router";
import { Patient } from "../../../../shared/models/patient.model";
import { ToastrService } from "ngx-toastr";
import { AppointmentsService } from "../../../../shared/services/appointments.service";
import { ExamService } from "../../../../shared/services/exam.service";
import { ExamModel } from "../../../../shared/models/exam.model";
import { MedicineService } from "../../../../shared/services/medicine.service";
import { DietService } from "../../../../shared/services/diet.service";
import { DietModel } from "../../../../shared/models/diet.model";

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css']
})
export class PatientsTableComponent implements OnInit {
  patientList: any[] = []

  constructor(
    private patientService: PatientService,
    private router: Router,
    private toastr: ToastrService,
    private appointmentService: AppointmentsService,
    private examsService: ExamService,
    private medicineService: MedicineService,
    private dietsService: DietService
  ) {}

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.patientService.getPatients().subscribe({
      next: response => {
        this.patientList = response
      },
      error: err => {
        alert('Credenciais inválidas. Tente resetar sua senha ou entre em contato com um administrador do sistema.')
        console.log({status: err.status, message: err.error})
      }
    })
  }

  search(filter: string) {
    if(filter.length == 0){
      console.log(filter.length)
      this.onLoad()
    } else{
      this.patientList = this.patientList.filter((patient:any) =>patient.name.toUpperCase().includes(filter.toUpperCase())|| patient.email?.includes(filter))
    }
  }

  onEditPatient(patientId: number) {
    this.router.navigate([`pacientes/editar/${patientId}`])
  }

  onAddPatient() {
    this.router.navigate([`pacientes/cadastrar`])
  }

  onDeactivatePatient(patient: Patient) {
    let confirmation = confirm("Ao desativar um pacientes todos seus registros também serão desativados e não será" +
      " possível reverter a operação. Confirmar?")

    if (confirmation) {
      this.deactivePatientAppointments(patient)
      this.deactivatePatientExams(patient);
      this.deactivePatientMedicines(patient)
      this.deactivatePatientDiets(patient);

      this.patientService.editPatient({...patient, isActive: false}).subscribe({
        next: () => {
          patient.isActive ? this.toastr.success("Paciente e todos seus registros foram atualizados para desativados.") : ""
        },
        error: err => this.toastr.error(err.message)
      })
    }
  }

  deactivePatientAppointments(patient: Patient) {
    this.appointmentService.getAppointmentsByPacientId(patient.id).subscribe(
      (appointments: any[]) => {
        appointments.forEach(appointment => {
          let updatedAppointment = appointment;
          updatedAppointment.isActive = false;
          this.appointmentService.updateAppointment(appointment.id, updatedAppointment).subscribe()
        })
      }
    )
  }

  deactivatePatientExams(patient: Patient) {
    this.examsService.getExamListById(patient.id).subscribe(
      (response) => {
        let exams: ExamModel[] = response.body;
        exams.forEach(exam => {
          let date = exam.examDate.split('/')
          let updatedExam = {
            ...exam,
            status: false,
            date: `${date[2]}-${date[1]}-${date[0]}`
          }
          this.examsService.putUpdateExam(exam.id, updatedExam).subscribe();
        })
      }
    )
  }

  deactivePatientMedicines(patient: Patient) {
    this.medicineService.getMedicines(patient.id).subscribe(
      (response) => {
        let medicines: any[] = response.body;

        medicines.forEach(medicine => {
          let date = medicine.medicineDate.split('/')
          let updatedMedicine = {
            ...medicine,
            status: false,
            medicineDate: `${date[2]}-${date[1]}-${date[0]}`
          }
          this.medicineService.inactivateMedicine(medicine.id, updatedMedicine).subscribe()
        })
      }
    )
  }

  deactivatePatientDiets(patient: Patient) {
    this.dietsService.getDietByPacientId(patient.id).subscribe(
      (diets: DietModel[]) => {
        diets.forEach(diet => {
          let updatedDiet = {...diet, status: false}
          this.dietsService.updateDiet(diet.id, updatedDiet).subscribe()
        })
      }
    )
  }

}
