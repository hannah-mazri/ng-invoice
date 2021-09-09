import { LayoutStateService } from './../../services/layout-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  invoiceModal$: Observable<boolean> = this.layoutState.$invoiceModal;

  constructor(private layoutState: LayoutStateService) {}

  ngOnInit(): void {}

  closeModal() {
    this.layoutState.toggleModal();
  }

  closeInvoice() {
    this.layoutState.toggleModal();
    this.layoutState.toggleInvoice();
  }
}
