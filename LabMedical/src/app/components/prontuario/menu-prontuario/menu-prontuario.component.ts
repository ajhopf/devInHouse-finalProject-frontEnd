import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-prontuario',
  templateUrl: './menu-prontuario.component.html',
  styleUrls: ['./menu-prontuario.component.css']
})
export class MenuProntuarioComponent {
  @Output() menuProntuario:EventEmitter<string> = new EventEmitter()

  changePage(page:string){
    this.menuProntuario.emit(page)
  }
}
