import { Component } from '@angular/core';
import {FormExerciseService} from "../../../shared/services/form-exercise.service";

@Component({
  selector: 'app-main-exercicios',
  templateUrl: './main-exercicios.component.html',
  styleUrls: ['./main-exercicios.component.css']
})
export class MainExerciciosComponent {
  constructor(public formExerciseService: FormExerciseService) {
  }
}
