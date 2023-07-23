import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../components/modal/modal.component";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) { }

  createModal(title: string, description: string): Observable<any> {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalTitle = title;
    modalRef.componentInstance.modalDescription = description;

    return from(modalRef.result);
  }
}
