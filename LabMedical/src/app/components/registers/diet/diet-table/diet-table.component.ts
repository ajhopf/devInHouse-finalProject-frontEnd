import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DietModel } from 'src/app/shared/models/diet.model';
import { DietService } from 'src/app/shared/services/diet.service';

@Component({
  selector: 'app-diet-table',
  templateUrl: './diet-table.component.html',
  styleUrls: ['./diet-table.component.css']
})
export class DietTableComponent {
  @Input() patientsDiets: DietModel[];
  @Input() patientId: string;
  @Output('editDiet') editDiet = new EventEmitter<any>();

  constructor(private dietService: DietService, private toastr: ToastrService, private router: Router) {  }


  onEditDiet(dietId: number) {
    this.router.navigate([`${this.patientId}/prontuario/dietas/${dietId}`])
  }

  onDeactivateDiet(diet: DietModel) {
    diet.status = !diet.status;

    let toastrMessage: string;

    if (diet.status) {
      toastrMessage = "dieta reativada"
    } else {
      toastrMessage = "dieta desativada"
    }

    this.dietService.updateDiet(diet.id, diet).subscribe({
      next: () => {
        diet.status ? this.toastr.success(toastrMessage) : this.toastr.warning(toastrMessage)
      },
      error: (err: any) => this.toastr.error(err.message)
    })
  }

}
