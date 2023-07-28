import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-special-care-list',
  templateUrl: './special-care-list.component.html',
  styleUrls: ['./special-care-list.component.css']
})
export class SpecialCareListComponent {
  @Input() specialCareList: any[];
}
