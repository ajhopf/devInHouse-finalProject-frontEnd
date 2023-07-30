import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DietEnum } from 'src/app/shared/enums/diet.enum';
import { DietModel } from 'src/app/shared/models/diet.model';
import { DietService } from 'src/app/shared/services/diet.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.css']
})
export class DietFormComponent {
  @ViewChild('dietForm') dietForm: NgForm | undefined;
	@Output('dietAddedSavedOrDeleted') dietAddedSavedOrDeleted = new EventEmitter<any>();
	@Input() patientId: number;
  
 	MANDATORY: string = "../../../assets/images/obrigatorio.png";
	dietId: number;
  dietType: DietEnum;
	patientMedications: any[]
	diet: DietModel = {
		dietName: '',
		dietDate: new Date().toISOString().slice(0, 10),
		time: new Date().toLocaleTimeString('pt-BR', {timeZone: 'America/Sao_Paulo'}).slice(0, 5),
		description: '',
		dietType: DietEnum.LOW_CARB,
		status: true,
		pacientId: null,
	}

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private dietService: DietService,
		private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
      this.diet.pacientId = this.patientId
      this.activatedRoute.paramMap.subscribe({
        next: params => {
          let dietFromParams = params.get('idDieta')
          if (dietFromParams) {
            this.dietService.getDietByPacientId(+this.patientId).subscribe({
              next: (diets: DietModel[]) => {
                this.diet = diets.find(diet => diet.id == +dietFromParams)
                this.dietId = +dietFromParams
              },
              error: err => console.log(err)
            })
          }
        }
      })
    }
  
    onAddDiet() {
      this.dietService.addDiet(this.diet).subscribe({
        next: () => {
          this.dietAddedSavedOrDeleted.emit();
          this.dietForm.reset();
          this.toastr.success("Dieta cadastrada com sucesso.", "Operação Realizada")
        },
        error: (err: any) => this.toastr.error("Consulta não cadastrada. Erro: " + err.message, "Operação não realizada")
      })
  
    }

    onSaveDiet(){
      this.dietService.updateDiet(this.diet.id, this.diet).subscribe({
        next: () => {
          this.dietAddedSavedOrDeleted.emit();
          this.dietForm.reset();
          this.toastr.success("Dieta editada com sucesso.", "Operação Realizada")
          this.router.navigate([`${this.patientId}/prontuario/dietas/`])      
        },
        error: err => this.toastr.error("Dieta não atualizada. Erro: " + err.message, "Operação não realizada")
      })
    }

    onDeleteDiet(){
      this.dietService.deleteDiet(this.dietId).subscribe({
        next: () => {
          this.dietAddedSavedOrDeleted.emit();
          this.dietForm.reset();
          this.toastr.success("Dieta deletada com sucesso.", "Operação Realizada")
          this.router.navigate([`${this.patientId}/prontuario/dietas/`])      
        },
        error: (err: any) => this.toastr.error("Dieta não deletada. Erro: " + err.message, "Operação não realizada")
      })
    }

}
