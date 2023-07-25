import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css']
})
export class ExamTableComponent implements OnInit {
  @Input() id: number;
  examList: any[] = [];
  constructor(private examService: ExamService){
  
  }

  ngOnInit(): void {
    this.onLoad()
  }

  onLoad(){
    this.examService.getExamListById(this.id).subscribe((
      {
        next: (response) =>{
          console.log(response.body)
          this.examList = response.body
        }
      }
    ))
  }
}
