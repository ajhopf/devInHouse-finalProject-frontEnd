import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-menu-prontuario',
  templateUrl: './menu-prontuario.component.html',
  styleUrls: ['./menu-prontuario.component.css']
})
export class MenuProntuarioComponent {
  @Output() menuProntuario:EventEmitter<string> = new EventEmitter()

  userRole:any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('session')).role
  }
  
  changePage(page:string){
    this.activatedRoute.paramMap.subscribe(params => {
      let patientId = params.get('patientId')
      let route;

      if (page == "prontuario") {
        route = `${patientId}/prontuario`
      } else {
        route = `${patientId}/prontuario/${page}`;
      }

      this.router.navigate([route])
    })

    // let route = `/prontuario/${page}`;
    // this.router.navigate([route])
    // this.menuProntuario.emit(page)
  }
}
