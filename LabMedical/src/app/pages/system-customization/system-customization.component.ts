import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../shared/services/config.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SystemConfigModel} from "../../shared/models/system-config.model";
import {ToastrService} from "ngx-toastr";
import {ModalService} from "../../shared/services/modal.service";

@Component({
  selector: 'app-system-customization',
  templateUrl: './system-customization.component.html',
  styleUrls: ['./system-customization.component.css']
})
export class SystemCustomizationComponent implements OnInit {
  systemConfigForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private systemConfigService: ConfigService,
              private toastr: ToastrService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.inicializeForm();
  }

  returnValidationClassForInput(inputName: string): string {
    if (this.checkIfInputIsUsed(inputName))
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
        this.toastr.error("Erro ao buscar informações do sistema, por favor tente novamente ou entre em contato com o suporte", "Erro")
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

  onSubmit(): void {
    if (this.systemConfigForm.valid) {
      this.systemConfigService.saveSystemConfig(this.systemConfigForm.value).subscribe({
        next: (): void => {
          this.toastr.success("Alterações salvas com sucesso", "Sucesso")
          this.inicializeForm()
        },
        error: (err: any) => {
          this.toastr.error("Erro ao salvar informações do sistema, por favor tente novamente ou entre em contato com o suporte", "Erro")
        }
      })
    }
  }

  restoreDefaults(): void {
    this.modalService.createModal("Restaurar configurações padrão", "Deseja restaurar as configurações padrão?")
      .subscribe({
        next: (resposta: boolean): void => {
          if (resposta) {
            this.systemConfigService.resetSystemConfig().subscribe({
              next: (): void => {
                this.inicializeForm()
              },
              error: (err: any) => {
                console.log(err)
              }
            })
          }
        },
        error: (err: any) => {
          console.log(err)
        }
      })
  }

}
