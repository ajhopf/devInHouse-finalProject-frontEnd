import { Pipe, PipeTransform } from '@angular/core';
import { RolesEnum } from '../enums/roles.enum';

@Pipe({
  name: 'rolesEnum'
})
export class RolesEnumPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case RolesEnum.ROLE_ADMIN:
        return 'Administrador';
      case RolesEnum.ROLE_DOCTOR:
        return 'Médico';
      case RolesEnum.ROLE_NURSE:
        return 'Enfermeiro';
      case RolesEnum.ROLE_PATIENT:
        return 'Paciente';
      default:
        return value;
    }
  }
}