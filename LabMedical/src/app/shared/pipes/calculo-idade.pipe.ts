import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculoIdade'
})
export class CalculoIdadePipe implements PipeTransform {

  transform(value: string): unknown {
    var today = new Date();
    var dateParts = value.split("-");
    var birthDate = new Date(`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

}
