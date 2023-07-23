import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-system-customization',
  templateUrl: './system-customization.component.html',
  styleUrls: ['./system-customization.component.css']
})
export class SystemCustomizationComponent {
  systemConfigForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.systemConfigForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      logoUrl: ['', [Validators.required, Validators.pattern('(https?|data):[^\\s/$.?#].[^\\s]*')]],
      primaryColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]],
      secondaryColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]],
      fontColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]],
    });
  }

  onSubmit(): void {
    if (this.systemConfigForm.valid) {
      console.log(this.systemConfigForm.value);
    }
    console.log(this.systemConfigForm.value);
  }

  returnValidationClassForInput(inputName: string): string {
    if(this.checkIfInputIsUsed(inputName))
      return this.systemConfigForm.controls[inputName].invalid ? 'is-invalid' : 'is-valid'
    return ''
  }

  checkIfInputIsUsed(inputName: string): boolean {
    return this.systemConfigForm.controls[inputName].dirty || this.systemConfigForm.controls[inputName].touched
  }
}
