import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-forms',
  templateUrl: './button-forms.component.html',
})
export class ButtonFormsComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;
}
