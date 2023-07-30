import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DietModel } from 'src/app/shared/models/diet.model';
import { Patient } from 'src/app/shared/models/patient.model';
import { DietService } from 'src/app/shared/services/diet.service';
import { PacientService } from 'src/app/shared/services/pacient.service';

@Component({
  selector: 'app-main-dietas',
  templateUrl: './main-dietas.component.html',
  styleUrls: ['./main-dietas.component.css']
})
export class MainDietasComponent {
  patientId: string;
  showPatientDiet: boolean = true;
  patientName: string;
  patientsDiets: DietModel[];

  constructor(
    private dietService: DietService,
    private patientService: PacientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let url = this.router.url;
    let indexOfSecondBar = url.split("/", 2).join("/").length;
    this.patientId = url.substring(1, indexOfSecondBar);
    if (this.patientId != undefined || this.patientId != null) {
      this.patientService.getPatient(+this.patientId).subscribe({
        next: (patient: Patient) => {
          this.patientName = patient.name;
        },
        error: err => alert("Erro ao buscar paciente com o id " + this.patientId)
      })
     this.dietAddedSavedOrDeleted();
    }

    this.activatedRoute.paramMap.subscribe({
      next: params => {
        let idConsulta = params.get('idDieta');

        if (idConsulta) {
          this.showPatientDiet = false;
        }
      }
    })
  }

  onAddNewDiet() {
    this.showPatientDiet = false;
  }

  onReturn() {
    this.showPatientDiet = true;
    this.router.navigate([`${this.patientId}/prontuario/dietas`])
  }

  dietAddedSavedOrDeleted() {
    this.showPatientDiet = true;

    this.dietService.getDietByPacientId(+this.patientId).subscribe({
      next: (value: DietModel[]) => {
        this.patientsDiets = value;
      },
      error: err => console.log(err)
    })
  }

}
