import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../shared/services/config.service";
import {ToastrService} from "ngx-toastr";
import {ModalService} from "../../shared/services/modal.service";
import {SystemConfigModel} from "../../shared/models/system-config.model";
import {ExercisetypeEnum} from "../../shared/enums/exercisetype.enum";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExerciseService} from "../../shared/services/exercise.service";
import {ExerciseModel} from "../../shared/models/exercise.model";


@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.css']
})
export class FormExerciseComponent {
  @Input() exercise: ExerciseModel;
  @Input() patientId: number;
  exerciseForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
              private toastr: ToastrService, private modalService: ModalService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.inicializeForm();
  }

  private inicializeForm() {
    this.exerciseForm = this.formBuilder.group({
      exerciseSeriesName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      timesPerWeek: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dateCreated: [''],
      timeCreated: [''],
      exerciseType: ['', [Validators.required]],
    })
    this.exerciseForm.patchValue(this.exercise);
  }

  onSubmit(): void {
    console.log(this.exerciseForm.value)
  }

  checkIfInputIsUsed(inputName: string): boolean {
    return this.exerciseForm.controls[inputName].dirty || this.exerciseForm.controls[inputName].touched
  }

  returnValidationClassForInput(inputName: string): string {
    if (this.checkIfInputIsUsed(inputName))
      return this.exerciseForm.controls[inputName].invalid ? 'is-invalid' : 'is-valid'
    return ''
  }

  protected readonly ExercisetypeEnum = ExercisetypeEnum;
  protected readonly Object = Object;
}
