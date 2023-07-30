import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ExamModel } from 'src/app/shared/models/exam.model';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css']
})
export class ExamTableComponent   {
  @Input() patientsExams: ExamModel[]
  @Input() patientId: number

  constructor(
    private examService: ExamService,
    private router: Router,
    private toastr: ToastrService
    ){
  
  }
  
  onEditExam(examId: number){
    this.router.navigate([`${this.patientId}/prontuario/exames/${examId}`])
  }

  onDeactivateExam(exam: ExamModel){
    exam.status = !exam.status;

    let toastrMessage: string;

    if (exam.status) {
      toastrMessage = "Exame reativado"
    } else {
      toastrMessage = "Exame desativado"
    }

    this.examService.putUpdateExam(exam.id, exam).subscribe({
      next: () => {
        exam.status ? this.toastr.success(toastrMessage) : this.toastr.warning(toastrMessage)
      },
      error: err => this.toastr.error(err.message)
    })
  }
  
}
