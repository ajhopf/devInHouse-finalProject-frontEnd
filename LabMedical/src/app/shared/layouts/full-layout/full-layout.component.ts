import { Component } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent {
  loading = false

  load(){
    this.loading = true
    setTimeout(()=>this.loading = false,1000)
  }

}
