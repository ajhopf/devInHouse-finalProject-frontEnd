import { Component, OnInit } from '@angular/core';
import { PatientService } from "../../shared/services/patient.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
  pacientList: any[] = []

  constructor(
    private pacientService: PatientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pacientService.getPatients().subscribe({
      next: response => {
        this.pacientList = response
      },
      error: error => console.log(error)
    })
  }

  onSeeRegister(id: number) {
    this.router.navigate([`home/pacient-form/${id}`])
  }
}
