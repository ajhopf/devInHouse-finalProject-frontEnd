import { ExamService } from 'src/app/shared/services/exam.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-exames',
  templateUrl: './main-exames.component.html',
  styleUrls: ['./main-exames.component.css']
})
export class MainExamesComponent {
  constructor(private examService: ExamService ){

  }
  
}
