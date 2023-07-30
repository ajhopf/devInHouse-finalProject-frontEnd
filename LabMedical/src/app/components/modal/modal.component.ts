import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalTitle: any;
  @Input() modalDescription: any;

  constructor(public activeModal: NgbActiveModal) {}

  confirm(answer: boolean): void {
    this.activeModal.close(answer);
  }
}
