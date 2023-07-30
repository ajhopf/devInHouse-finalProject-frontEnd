import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from "../models/appointment.model";
import { DietModel } from "../models/diet.model";

@Pipe({
  name: 'dietSorting'
})
export class DietSortingPipe implements PipeTransform {

  transform(array: DietModel[] | any[]): DietModel[] {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    array.sort((a, b) => {
      const dateComparison = a.dietDate.localeCompare(b.dietDate);
      if (dateComparison !== 0) {
        return -dateComparison;
      }
      return -a.time.localeCompare(b.time);
    });

    return array;
  }

}
