import { Component, OnInit } from '@angular/core';
import { PacientService } from "../../shared/services/pacient.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-teste-listagem-pacientes',
  templateUrl: './teste-listagem-pacientes.component.html',
  styleUrls: ['./teste-listagem-pacientes.component.css']
})
export class TesteListagemPacientesComponent implements OnInit{
  pacientList: any[] = []

  constructor(
    private pacientService: PacientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pacientService.getPacients().subscribe({
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
