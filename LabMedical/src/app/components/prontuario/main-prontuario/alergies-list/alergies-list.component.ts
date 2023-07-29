import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alergies-list',
  templateUrl: './alergies-list.component.html',
  styleUrls: ['./alergies-list.component.css']
})
export class AlergiesListComponent {
  @Input() alergiesList: any[];
}
