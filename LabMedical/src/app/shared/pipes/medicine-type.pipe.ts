import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medicineType'
})
export class MedicineTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'CAPSULE':
        return 'Capsula';
      case 'PILL':
        return 'Pílula';
      case 'LIQUID':
        return 'Líquido';
      case 'CREAM':
        return 'Creme';
      case 'GEL':
        return 'Gel';
      case 'INHALATION':
        return 'Inalação';
      case 'INJECTION':
        return 'Injeção';
      case 'SPRAY':
        return 'Spray';
      default:
        return value;
    }
  }

}
