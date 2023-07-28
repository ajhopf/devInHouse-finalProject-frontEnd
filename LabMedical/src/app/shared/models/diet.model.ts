import { DietEnum } from "../enums/diet.enum";

export interface DietModel{
    id?: number,
    name: string,
    date: string,
    time: string,
    type: DietEnum,
    description: string,
    status: boolean,
    patientId?: number
}
