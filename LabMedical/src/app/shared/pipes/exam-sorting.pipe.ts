import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from "../models/appointment.model";
import { ExamModel } from "../models/exam.model";

@Pipe({
  name: 'examSorting'
})
export class ExamSortingPipe implements PipeTransform {

  transform(array: ExamModel[] | any[]): ExamModel[] {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    array.sort((a, b) => {
      const dateComparison = a.examDate.localeCompare(b.examDate);
      if (dateComparison !== 0) {
        return -dateComparison;
      }
      return -a.time.localeCompare(b.time);
    });

    return array;
  }

}
