import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurementUnit'
})
export class MeasurementUnitPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'GRAM':
        return 'g';
      case 'MICROGRAM':
        return 'mcg';
      case 'MILLIGRAM':
        return 'mg';
      case 'MILLILITER':
        return 'mL';
        case 'PERCENTAGE':
          return '%';
      default:
        return value;
    }
  }

}
