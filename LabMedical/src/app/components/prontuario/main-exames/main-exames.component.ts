import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-exames',
  templateUrl: './main-exames.component.html',
  styleUrls: ['./main-exames.component.css']
})
export class MainExamesComponent {
  @Input() id: any;

}
