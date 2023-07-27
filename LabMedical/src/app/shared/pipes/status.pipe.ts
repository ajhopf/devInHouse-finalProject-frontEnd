import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'statusName'
})
export class StatusPipe implements PipeTransform {
    transform(value: boolean): string{
        switch (value) {
            case (true):
                return 'Ativo'
            case (false):
                return 'Inativo'
            default:
                return 'Ativo'
        }
    }
}