import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../shared/services/config.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SystemConfigModel} from "../../shared/models/system-config.model";

@Component({
  selector: 'app-system-customization',
  templateUrl: './system-customization.component.html',
  styleUrls: ['./system-customization.component.css']
})
export class SystemCustomizationComponent implements OnInit {
  systemConfigForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private systemConfigService: ConfigService) {}

  ngOnInit(): void {
    this.inicializeForm();
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

  private inicializeForm() {
    this.systemConfigService.getSystemConfig().subscribe({
      next: (systemConfigModel: SystemConfigModel): void => {
        this.systemConfigForm.setValue(systemConfigModel)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    this.systemConfigForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      logoUrl: ['', [Validators.required, Validators.pattern('(https?|data):[^\\s/$.?#].[^\\s]*')]],
      primaryColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]],
      secondaryColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]],
      fontColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]],
    });
  }

}
