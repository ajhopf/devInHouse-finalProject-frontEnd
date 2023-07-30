import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from "../models/appointment.model";
import { ExerciseModel } from "../models/exercise.model";

@Pipe({
  name: 'exerciseSorting'
})
export class ExerciseSortingPipe implements PipeTransform {

  transform(array: ExerciseModel[] | any[]): ExerciseModel[] {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    array.sort((a, b) => {
      const dateComparison = a.dateCreated.localeCompare(b.dateCreated);
      if (dateComparison !== 0) {
        return -dateComparison;
      }
      return -a.timeCreated.localeCompare(b.timeCreated);
    });

    return array;
  }

}
