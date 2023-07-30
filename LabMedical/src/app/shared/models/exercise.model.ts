import {ExercisetypeEnum} from "../enums/exercisetype.enum";

export interface ExerciseModel {
  id?: number
  description?: string
  dateCreated?: string
  timeCreated?: string
  exerciseType?: ExercisetypeEnum
  timesPerWeek?: number
  exerciseSeriesName?: string
  patientId?: number
  status?: boolean
}
