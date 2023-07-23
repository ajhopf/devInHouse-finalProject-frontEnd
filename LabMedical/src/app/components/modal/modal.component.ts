import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<void>();

  confirm(boolean: boolean): void {
    this.confirmed.emit(boolean);
    $('#confirmationModal').modal('hide'); // Hide the modal after confirmation
  }
}
