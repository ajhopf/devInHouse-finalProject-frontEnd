import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormExerciseComponent} from "../../components/form-exercise/form-exercise.component";

@Injectable({
  providedIn: 'root'
})
export class FormExerciseService {

  constructor(private modalService: NgbModal) {}

  openModal():void {
    this.modalService.open(FormExerciseComponent);
  }
}
