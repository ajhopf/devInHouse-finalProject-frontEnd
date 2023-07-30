import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamModel } from 'src/app/shared/models/exam.model';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent {
  @ViewChild('examForm') examForm: NgForm;
  @Input() patientId: number
  @Input() ExamIdUpdate: number;
  @Output() examAddedSavedOrDeleted = new EventEmitter<any>()
  OBRIGATORIO: string = '../../../assets/images/obrigatorio.png' 
  examId: number;

  exam: ExamModel = {
    name: '',
    examDate: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString('pt-BR', {timeZone: 'America/Sao_Paulo'}).slice(0, 5),
    type: '',
    laboratory: '',
    documentUrl: '',
    result: '',
    status: true,
    pacientId: null
  }


  constructor(
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
    ){}

  ngOnInit() {
		this.exam.pacientId = this.patientId
		this.activatedRoute.paramMap.subscribe({
			next: params => {
				let examIdFromParams = params.get('idExame')

				if (examIdFromParams) {
					this.examService.getExamListById(+this.patientId).subscribe({
						next: (exams: ExamModel[]) => {
							this.exam = exams.find(ex => ex.id == +examIdFromParams)
							this.examId = +examIdFromParams
						},
						error: err => console.log(err)
					})
				}
			}
		})
	}

  onAddExam() {
		this.examService.postNewExam(this.exam).subscribe({
			next: () => {
				this.examAddedSavedOrDeleted.emit();
				this.examForm.reset();
				this.toastr.success("Exame cadastrado com sucesso.", "Operação Realizada")
			},
			error: err => this.toastr.error("Exame não cadastrado. Erro: " + err.message, "Operação não realizada")
		})

	}

  onSaveExam(){
    this.examService.putUpdateExam(this.exam.id, this.exam).subscribe({
			next: () => {
				this.examAddedSavedOrDeleted.emit();
				this.examForm.reset();
				this.toastr.success("Exame editado com sucesso.", "Operação Realizada")
			},
			error: err => this.toastr.error("Exame não atualizado. Erro: " + err.message, "Operação não realizada")
		})
  }

  onDeleteExam(){
    this.examService.deleteExam(this.examId).subscribe({
			next: () => {
				this.examAddedSavedOrDeleted.emit();
				this.examForm.reset();
				this.toastr.success("Exame deletado com sucesso.", "Operação Realizada")
			},
			error: err => this.toastr.error("Exame não deletado. Erro: " + err.message, "Operação não realizada")
		})
  }

}
