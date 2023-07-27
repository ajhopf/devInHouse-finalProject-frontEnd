import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../shared/services/config.service";
import {ToastrService} from "ngx-toastr";
import {ModalService} from "../../shared/services/modal.service";
import {SystemConfigModel} from "../../shared/models/system-config.model";
import {ExercisetypeEnum} from "../../shared/enums/exercisetype.enum";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.css']
})
export class FormExerciseComponent {
  exerciseForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
              private toastr: ToastrService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.inicializeForm();
  }

  private inicializeForm() {
    this.exerciseForm = this.formBuilder.group({
      exerciseName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      timesPerWeek: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dateCreated: ['', [Validators.required]],
      timeCreated: ['', [Validators.required]],
      exerciseType: ['', [Validators.required]],
    })
  }

  onSubmit(): void {
    //serve para fechar o modal angular
    this.activeModal.close();
    console.log(this.exerciseForm)
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
