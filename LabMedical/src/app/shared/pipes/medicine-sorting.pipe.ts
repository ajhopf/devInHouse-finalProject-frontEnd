import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medicineSorting'
})
export class MedicineSortingPipe implements PipeTransform {

  transform(array: any[]): any[] {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    array.sort((a, b) => {
      const dateComparison = a.medicineDate.localeCompare(b.medicineDate);
      if (dateComparison !== 0) {
        return -dateComparison;
      }
      return -a.time.localeCompare(b.time);
    });

    return array;
  }

}
