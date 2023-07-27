
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
import { AuthenticationService } from './authentication.service';
import { Observable, map } from 'rxjs';
import { ExamModel } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {   
    constructor(private http: HttpClient, private authenticationService: AuthenticationService){

    }


    getExamListById(idPacient: number): Observable<any>{
        return this.http.get(`${environment.URL_EXAMS}`,
            {
                observe: 'response',
                params: {pacientId: idPacient},
                headers: {'Authorization': `Bearer ${this.authenticationService.getToken()}`}
            }
        )
    }

    getAllExams(): Observable<any>{
        return this.http.get(`${environment.URL_EXAMS}`,
            {
                observe: 'response',
                headers: {'Authorization': `Bearer ${this.authenticationService.getToken()}`}
            }
        )
    }

    getExam(): Observable<any>{
        return this.http.get(`${environment.URL_EXAMS}`,
            {
                observe: 'response',
                headers: {'Authorization': `Bearer ${this.authenticationService.getToken()}`}
            }
        )
    }

    postNewExam(exam: ExamModel): Observable<any>{
        return this.http.post(
            `${environment.URL_EXAMS_REGISTER}`,
            exam,
            {
                observe: 'response',
                headers: {'Authorization': `Bearer ${this.authenticationService.getToken()}`}
            }
        )
    }

    putUpdateExam(id: number, exam: ExamModel): Observable<any>{
        return this.http.put(
            `${environment.URL_EXAMS_UPDATE}/${id}`,
            exam,
            {
                observe: 'response',
                headers: {'Authorization': `Bearer ${this.authenticationService.getToken()}`}
            }
        )
    }

    deleteExam(id: number): Observable<any>{
        return this.http.delete(
            `${environment.URL_EXAMS}/${id}`,
            {
                observe: 'response',
                headers: {'Authorization': `Bearer ${this.authenticationService.getToken()}`}
            }
        )
    }
}