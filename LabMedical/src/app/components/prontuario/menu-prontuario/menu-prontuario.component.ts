import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-prontuario',
  templateUrl: './menu-prontuario.component.html',
  styleUrls: ['./menu-prontuario.component.css']
})
export class MenuProntuarioComponent {
  @Output() menuProntuario:EventEmitter<string> = new EventEmitter()

  userRole:any

  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('session')).role
  }

  
  changePage(page:string){
    this.menuProntuario.emit(page)
  }
}
