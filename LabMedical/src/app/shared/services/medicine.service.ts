import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import {environment} from "../../enviroments/enviroment";
import { newMedicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  medicineList:any

  constructor(private http: HttpClient) {}

  setMedicineList(){
    this.getMedicines(localStorage.getItem('patientId')).subscribe({
      next: (response) => {
        console.log(response.body)
        this.medicineList = response.body
      },
      error: (err) => {
        console.error({status: err.status, message: err.error})
      }
    })
  }
  

  getMedicines(patientId:any):Observable<any>{
    let user = JSON.parse(localStorage.getItem("session"))
    return this.http.get(`${environment.URL_MEDICINES}?pacientId=${patientId}`,
    {
      observe: 'response',
      headers :  {
        'Authorization': `Bearer ${user.access_token}`
      }
    })
  } 

  saveMedicine(campos:any, status:boolean): Observable<any> {
    	let medicine = newMedicine(campos,status)
		let userAdmin = JSON.parse(localStorage.getItem("session"))
		return this.http.post(environment.URL_MEDICINES,
		medicine,
			{
				observe: 'response',
				params: {role: userAdmin.role},
				headers: {'Authorization': `Bearer ${userAdmin.access_token}`}
			}
		)
   }

  updateMedicine(id:number, campos: any, status:boolean): Observable<string> {
    let medicine = newMedicine(campos, status)
		let userAdmin = JSON.parse(localStorage.getItem("session"))
		return this.http.put(
			`${environment.URL_MEDICINES}/${id}`,
			medicine,
			{
				observe: 'response',
				headers: {
					'Authorization': `Bearer ${userAdmin.access_token}`,
					'Content-Type': 'application/json'
				},
				responseType: 'text',
			}
		).pipe(
			map((response: HttpResponse<string>) => response.body)
		)
	}

  deleteMedicineById(id: number): Observable<string> {
		let userAdmin = JSON.parse(localStorage.getItem("session"))
		return this.http.delete(
			`${ environment.URL_MEDICINES}/${id}`,
			{
				observe: 'response',
				headers: {
					'Authorization': `Bearer ${userAdmin.access_token}`,
					'Content-Type': 'application/json'
				},
				responseType: 'text'
			}
		).pipe(
			map((response: HttpResponse<string>) => response.body)
		)
	}

	inactivateMedicine(id:number, medicine:any): Observable<string> {
		let userAdmin = JSON.parse(localStorage.getItem("session"))
		return this.http.put(
			`${environment.URL_MEDICINES}/${id}`,
			medicine,
			{
				observe: 'response',
				headers: {
					'Authorization': `Bearer ${userAdmin.access_token}`,
					'Content-Type': 'application/json'
				},
				responseType: 'text',
			}
		).pipe(
			map((response: HttpResponse<string>) => response.body)
		)
	}

}
