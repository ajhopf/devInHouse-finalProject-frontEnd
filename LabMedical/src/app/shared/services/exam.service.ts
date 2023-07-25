
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

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
}