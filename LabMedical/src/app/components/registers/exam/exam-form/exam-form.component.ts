import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExamModel } from 'src/app/shared/models/exam.model';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent {
  @ViewChild('signIn') signInForm: NgForm;
  pacientId: number =  parseInt(localStorage.getItem('patientId'))
  @Input() ExamIdUpdate: number;
  @Output() closeModal = new EventEmitter<boolean>()
  OBRIGATORIO: string = '../../../assets/images/obrigatorio.png' 
  exam: ExamModel = {
    name: '',
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString(),
    type: '',
    laboratory: '',
    documentUrl: '',
    result: '',
    status: true,
    pacientId: 0
  }
  formValid: boolean = false;


  isEditing: boolean =  false;

  constructor(private examService: ExamService){}
  ngOnInit(){
    if(this.ExamIdUpdate != null){
      this.openEditExam(this.ExamIdUpdate);
    }
  }

  validForm() {
    this.formValid = this.signInForm.valid;
  }

  registerExam(){
    if(this.isEditing && this.formValid){
      this.examService.putUpdateExam(this.exam.id, this.exam).subscribe(({
        next: () => {
          alert("Exame atualizado com sucesso")
          this.cleanForm()
          this.modalClose()
        },
        error: (err) =>{
          alert(err.message)
        }
      }))
      return      
    }
    if(this.formValid){
      const newExam : ExamModel = {
        ...this.exam,
        time: this.exam.time,
        pacientId: this.pacientId
      }
      this.examService.postNewExam(newExam).subscribe((
        {
          next:() =>{
            alert("Exame cadastrado com sucesso")
            this.cleanForm()
          },
          error: (err) =>{
            alert(err.message)
          }
        }
      ))
    }else{
      alert("Formulário inválido")
    }
  }

  openEditExam(id: number){
    this.examService.getExamListById(this.pacientId).subscribe((
      {
        next: (respose) =>{
          this.exam = respose.body.find((exam: any) => exam.id == id)
          let date = this.exam.date.split('/')
          this.exam = {
            ...this.exam,
            date: `${date[2]}-${date[1]}-${date[0]}`
          }
          this.isEditing = true
        },
        error: (err) => {
          alert(err.message)
        }
      }
    ))
  }

  modalClose(){
    this.closeModal.emit(false)
  }
  
  cleanForm() {
    this.exam = {
      name: '',
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString(),
      type: '',
      laboratory: '',
      documentUrl: '',
      result: '',
      status: true,
      pacientId: 0
    }
    this.signInForm.reset();
  }

  deleteExam(){
    if(this.isEditing){
      this.examService.deleteExam(this.exam.id).subscribe((
        {
         next: () =>{
           alert("Exame removido!")
          this.modalClose()
         },
         error: (err) =>{
           alert(err.message)
         }
        }
       ))
    }else{
      alert("Selecione um exame")
    }

  }

}
