import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ExamModel } from 'src/app/shared/models/exam.model';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css']
})
export class ExamTableComponent implements OnInit, OnChanges {
  pacientId: number =  parseInt(localStorage.getItem('patientId'))
  examList: ExamModel[] = [];
  ANEXO: string = '../../../assets/images/document.png'
  examIdUpdate: number = null
  openFormRegister = false;

 
  constructor(private examService: ExamService){
  
  }
  

  ngOnInit(): void {
       this.renderPage()
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  examUpdate(id: number){
    this.examIdUpdate = id
    this.openForm(true)
  }

  renderPage(){
    if(this.pacientId == null || this.pacientId == undefined){
      this.allExams()
    }else{
      this.onLoad()
    }
  }

  onLoad(){
    this.examService.getExamListById(this.pacientId).subscribe((
      {
        next: (response) =>{
          this.examList = response.body
        }
      }
    ))
  }

  allExams(){
    this.examService.getAllExams().subscribe((
      {
        next: (response) =>{
          this.examList = response.
          this.examService.examListUpdated.emit(this.examList)
        }
      }
    ))
  }

  openForm(open: boolean){
    this.openFormRegister = open
    this.renderPage()
  }



 
}
