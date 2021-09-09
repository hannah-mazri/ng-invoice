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
  invoiceDateUnix = Date.now();
  paymentDueDateUnix = 0;

  loading = false;

  invoiceModal$: Observable<boolean> = this.layoutState.$invoiceModal;

  constructor(
    private fb: FormBuilder,
    private layoutState: LayoutStateService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.invoiceForm.patchValue({
      invoiceDate: new Date(this.invoiceDateUnix).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    });
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
      invoiceDate: null,
      paymentTerms: null,
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

  onOptionSelected(event: any) {
    const futureDate = new Date();
    this.paymentDueDateUnix = futureDate.setDate(
      futureDate.getDate() + parseInt(event.target.value)
    );

    this.invoiceForm.patchValue({
      paymentDueDate: new Date(this.paymentDueDateUnix).toLocaleDateString(
        'en-us',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      ),
    });
  }
}
