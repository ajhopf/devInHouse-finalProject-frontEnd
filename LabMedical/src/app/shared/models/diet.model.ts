import { DietEnum } from "../enums/diet.enum";

export interface DietModel{
    id?: number,
    dietName: string,
    dietDate: string,
    time: string,
    dietType: DietEnum,
    description: string,
    status: boolean,
    patientId?: number
}
