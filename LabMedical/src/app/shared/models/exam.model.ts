export interface ExamModel{
    id?: number,
    name: string,
    date: string,
    time: string,
    type: string,
    laboratory: string,
    documentUrl?: string,
    result: string,
    status: boolean,
    pacientId?: number
}