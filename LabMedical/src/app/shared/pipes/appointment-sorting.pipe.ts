import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from "../models/appointment.model";

@Pipe({
  name: 'appointmentSortingPipe'
})
export class AppointmentSortingPipe implements PipeTransform {

  transform(array: Appointment[] | any[]): Appointment[] {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    array.sort((a, b) => {
      const dateComparison = a.appointmentDate.localeCompare(b.appointmentDate);
      if (dateComparison !== 0) {
        return -dateComparison;
      }
      return -a.time.localeCompare(b.time);
    });

    return array;
  }

}
