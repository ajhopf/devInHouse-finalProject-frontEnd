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
  @Output('editAppointment') editAppointment = new EventEmitter<any>();

  constructor(private dietService: DietService, private toastr: ToastrService) {  }


  onEditAppointment(appointmentId: number) {
    console.log(appointmentId)
    this.editAppointment.emit(appointmentId);
  }

  onDeactivateAppointment(appointment: DietModel) {
    appointment.status = !appointment.status;

    let toastrMessage: string;

    if (appointment.status) {
      toastrMessage = "Consulta reativada"
    } else {
      toastrMessage = "Consulta desativada"
    }

    // this.dietService.updateAppointment(appointment.id, appointment).subscribe({
    //   next: () => {
    //     appointment.isActive ? this.toastr.success(toastrMessage) : this.toastr.warning(toastrMessage)
    //   },
    //   error: (err: any) => this.toastr.error(err.message)
    // })
  }

}
