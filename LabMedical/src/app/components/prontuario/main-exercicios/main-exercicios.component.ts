import {Component, OnInit} from '@angular/core';
import {FormExerciseService} from "../../../shared/services/form-exercise.service";
import {ExerciseModel} from "../../../shared/models/exercise.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PacientService} from "../../../shared/services/pacient.service";
import {Patient} from "../../../shared/models/patient.model";
import {ExerciseService} from "../../../shared/services/exercise.service";
import {ToastrService} from "ngx-toastr";
import {Appointment} from "../../../shared/models/appointment.model";

@Component({
  selector: 'app-main-exercicios',
  templateUrl: './main-exercicios.component.html',
  styleUrls: ['./main-exercicios.component.css']
})
export class MainExerciciosComponent implements OnInit{
  patientName: any;
  exercisesOfPetient: ExerciseModel[] = [];
  patientId: string;
  constructor(public formExerciseService: FormExerciseService,
              private activatedRoute: ActivatedRoute,
              private patientService: PacientService,
              private exerciseService: ExerciseService,
              private router: Router,
              private toastr: ToastrService) {
  }

  onEditExercise(exercise: ExerciseModel) {
    this.formExerciseService.openModal(this.patientId, exercise).subscribe({
      next: () => {
        this.inicializeExercisesList();
      }
    });
  }

  onNewExercise() {
    this.formExerciseService.openModal(this.patientId).subscribe({
      next: () => {
        this.inicializeExercisesList();
      }
    });
  }

  onDeactivateExercise(exercise: ExerciseModel) {
    exercise.status = !exercise.status;
    this.exerciseService.updateExercise(exercise).subscribe({
      next: () => {
        this.toastr.success("Exercício alterado")
      },
      error: () =>
        this.toastr.error("Erro ao alterar exercício")
    })
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
        error: () => alert("Erro ao buscar paciente com o id " + this.patientId)
      })
      this.inicializeExercisesList();
    }

    this.activatedRoute.paramMap.subscribe({
      next: params => {
        let id: number = parseInt(params.get('idExercicio'));
        this.exercisesOfPetient.forEach((el: ExerciseModel): void => {
          if(el.id == id){
            this.formExerciseService.openModal(this.patientId, el);
          }
        })
      }
    })
    let exerciseId: number;
    this.activatedRoute.paramMap.subscribe({
      next: params => {
        exerciseId = parseInt(params.get('idExercicio'))
      }
    })
    if(exerciseId) {
      this.exerciseService.getAll().subscribe({
        next: (exercises: ExerciseModel[]) => {
          exercises.forEach(el => {
            if(el.id == exerciseId){
              this.formExerciseService.openModal(this.patientId, el);
            }
          })
        }
      })
    }
  }

  private inicializeExercisesList() {
    this.exerciseService.getExercisesByPatient(this.patientId).subscribe({
      next: (exercises: any) => {
        this.exercisesOfPetient = exercises;
      }
    })
  }
}
