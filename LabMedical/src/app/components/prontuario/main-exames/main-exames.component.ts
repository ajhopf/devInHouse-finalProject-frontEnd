import { ExamService } from 'src/app/shared/services/exam.service';
import { Component, Input, OnInit } from '@angular/core';
import { ExamModel } from 'src/app/shared/models/exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'app-main-exames',
  templateUrl: './main-exames.component.html',
  styleUrls: ['./main-exames.component.css']
})
export class MainExamesComponent {
  patientId: string;
  showPatientExam: boolean = true;
  patientName: string;
  patientExams: ExamModel[];
  constructor(
    private examService: ExamService, 
    private router: Router, 
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(){
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
      this.onExamAddedSavedOrDeleted()
    }

    this.activatedRoute.paramMap.subscribe({
      next: params => {
        let idConsulta = params.get('idExame');

        if (idConsulta) {
          this.showPatientExam = false;
        }
      }
    })
  }

  onAddNewExam(){
    this.showPatientExam = false;

  }

  onReturn(){
    this.showPatientExam = true;
    this.router.navigate([`${this.patientId}/prontuario/exames`])

  }

  onExamAddedSavedOrDeleted(){
    this.showPatientExam = true;
    this.examService.getExamListById(+this.patientId).subscribe({
      next: (value) => {
        this.patientExams = value;
      },
      error: (err:any) =>{
        console.log(err)
      }
    })
  }
  
}
