export interface ExamModel{
    id?: number,
    name: string,
    examDate: string,
    time: string,
    type: string,
    laboratory: string,
    documentUrl?: string,
    result: string,
    status: boolean,
    pacientId?: number
}