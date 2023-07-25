import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ExamModel } from 'src/app/shared/models/exam.model';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css']
})
export class ExamTableComponent implements OnInit {
  @Input() pacientId: number;
  examList: ExamModel[] = [];
  OBRIGATORIO: string = '../../../assets/images/obrigatorio.png' 
  openFormRegister = false;
  exam: ExamModel = {
    name: '',
    date: '',
    time: '',
    type: '',
    laboratory: '',
    documentUrl: '',
    result: '',
    status: '',
    pacientId: ''
  }
  constructor(private examService: ExamService){
  
  }

  ngOnInit(): void {
       this.renderPage()
  }



  renderPage(){
    if(this.pacientId == null){
      this.allExams()
    }else{
      this.onLoad()
    }
  }

  onLoad(){
    this.examService.getExamListById(this.pacientId).subscribe((
      {
        next: (response) =>{
          console.log(response.body)
          this.examList = response.body
        }
      }
    ))
  }

  allExams(){
    this.examService.getAllExams().subscribe((
      {
        next: (response) =>{
          this.examList = response.body
        }
      }
    ))
  }

  openForm(){
    this.openFormRegister = !this.openFormRegister
  }

  validForm(){}


}
