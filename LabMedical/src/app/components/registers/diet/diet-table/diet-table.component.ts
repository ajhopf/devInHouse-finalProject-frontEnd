import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output('editDiet') editDiet = new EventEmitter<any>();

  constructor(private dietService: DietService, private toastr: ToastrService) {  }


  onEditdiet(dietId: number) {
    console.log(dietId)
    this.editDiet.emit(dietId);
  }

  onDeactivateDiet(diet: DietModel) {
    diet.status = !diet.status;

    let toastrMessage: string;

    if (diet.status) {
      toastrMessage = "Consulta reativada"
    } else {
      toastrMessage = "Consulta desativada"
    }

    // this.dietService.updatediet(diet.id, diet).subscribe({
    //   next: () => {
    //     diet.isActive ? this.toastr.success(toastrMessage) : this.toastr.warning(toastrMessage)
    //   },
    //   error: (err: any) => this.toastr.error(err.message)
    // })
  }

}
