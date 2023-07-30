import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExerciseModel} from "../models/exercise.model";
import {environment} from "../../enviroments/enviroment";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient,private userService: UserService) { }

  createExercise(exercise: ExerciseModel) {
    let user = this.userService.getUser()
    return this.http.post(
      `${environment.URL_EXERCISE}`,
      exercise,
      {
        headers: {
          'Authorization': `Bearer ${user.access_token}`
        }
      }
    )
  }

  updateExercise(exercise: ExerciseModel) {
    let user = this.userService.getUser()
    return this.http.put(
      `${environment.URL_EXERCISE}/${exercise.id}`,
      exercise,
      {
        headers: {
          'Authorization': `Bearer ${user.access_token}`
        }
      }
    )
  }

  getById(idExercise: number) {
    let user = this.userService.getUser()
    return this.http.get(
      `${environment.URL_EXERCISE}/${idExercise}`,
      {
        headers :  {
          'Authorization': `Bearer ${user.access_token}`
        }
      }
    )
  }

  getExercisesByPatient(patientId: string) {
    let user = this.userService.getUser()
    return this.http.get(
      `${environment.URL_EXERCISE}/patientId/${patientId}`,
      {
        headers :  {
          'Authorization': `Bearer ${user.access_token}`
        }
      }
    )
  }

  getAll(): Observable<ExerciseModel[]> {
    let user = this.userService.getUser()
    return this.http.get<ExerciseModel[]>(
      `${environment.URL_EXERCISE}`,
      {
        headers :  {
          'Authorization': `Bearer ${user.access_token}`
        }
      }
    )
  }

  deleteExercise(id: number) {
    let user = this.userService.getUser()
    return this.http.delete(
      `${environment.URL_EXERCISE}/${id}`,
      {
        headers :  {
          'Authorization': `Bearer ${user.access_token}`
        }
      }
    )
  }
}
