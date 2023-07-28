import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Patient } from "../../../shared/models/patient.model";
import { PacientService } from "../../../shared/services/pacient.service";

@Component({
  selector: 'app-main-prontuario',
  templateUrl: './main-prontuario.component.html',
  styleUrls: ['./main-prontuario.component.css']
})
export class MainProntuarioComponent implements OnChanges {
  @Input('patientId') patientId: string;
  patient: Patient;

  constructor(private patientService: PacientService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.patientId != undefined || this.patientId != null) {
      this.patientService.getPatient(+this.patientId).subscribe({
        next: (patient: Patient) => {
          this.patient = patient;
        },
        error: () => alert("Erro ao buscar paciente com o id " + this.patientId)
      })
    }
  }
}
