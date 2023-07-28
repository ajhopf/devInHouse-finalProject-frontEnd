import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input('patientId') patientId: string;
  showPatientDiet: boolean = true;
  patientName: string;
  patientsDiets: DietModel[];
  dietForEdition: DietModel;

  constructor(
    private dietService: DietService,
    private patientService: PacientService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (this.patientId != undefined || this.patientId != null) {
      this.patientService.getPatient(+this.patientId).subscribe({
        next: (patient: Patient) => {
          this.patientName = patient.name;
        },
        error: err => alert("Erro ao buscar paciente com o id " + this.patientId)
      })

     this.onDietAddedSavedOrDeleted();
    }
  }

  onAddNewAppointment() {
    this.showPatientDiet = false;
  }

  onReturn() {
    this.showPatientDiet = true;
    this.dietForEdition = undefined;
  }

  onDietAddedSavedOrDeleted() {
    this.showPatientDiet = true;
    this.dietForEdition = undefined;

    this.dietService.getDietByPacientId(+this.patientId).subscribe({
      next: (value: DietModel[]) => {
        this.patientsDiets = value;
      },
      error: err => console.log(err)
    })
  }

  onEditAppointmentId(dietId: number) {
    this.dietForEdition = this.patientsDiets.find(diet => diet.id == dietId)
  }

}
