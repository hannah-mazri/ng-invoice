import { LayoutStateService } from './../../services/layout-state.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss'],
})
export class InvoiceModalComponent implements OnInit {
  // @ts-ignore
  invoiceForm: FormGroup;
  invoiceItemList = [];

  dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  loading = false;

  invoiceModal$: Observable<boolean> = this.layoutState.$invoiceModal;

  constructor(
    private fb: FormBuilder,
    private layoutState: LayoutStateService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.invoiceForm = this.fb.group({
      docId: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceTotal: 0,
    });
  }

  closeInvoice() {
    this.layoutState.toggleInvoice();
  }
}
