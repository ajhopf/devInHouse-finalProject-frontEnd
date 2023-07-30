import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormExerciseComponent} from "../../components/form-exercise/form-exercise.component";
import {ExerciseModel} from "../models/exercise.model";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormExerciseService {

  constructor(private modalService: NgbModal) {}

  openModal(patientId: string, exercise?: ExerciseModel):any {
    let modalRef = this.modalService.open(FormExerciseComponent, { size: 'lg' });
    modalRef.componentInstance.exercise = exercise;
    modalRef.componentInstance.patientId = patientId;
    return from(modalRef.result);
  }
}
