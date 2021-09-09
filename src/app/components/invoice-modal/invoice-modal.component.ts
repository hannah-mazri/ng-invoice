import { LayoutStateService } from './../../services/layout-state.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { uid } from 'uid';

interface InvoiceItemList {
  id: string;
  itemName: string;
  qty: string;
  price: number;
  total: number;
}
@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss'],
})
export class InvoiceModalComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceItemList!: FormArray;
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

      invoiceItemList: this.fb.array([this.createItem()]),
      invoiceTotal: 0,
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: uid(),
      itemName: '',
      qty: '',
      price: 0,
      total: 0,
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

  addNewInvoiceItem(): void {
    this.myItems.push(this.createItem());
  }

  deleteInvoiceItem(i: number) {
    this.myItems.removeAt(i);
  }

  prt(item: any, i: number) {
    console.log('Exposed item name:', this.myItems.controls[i].value.total);
  }

  get myItems() {
    return <FormArray>this.invoiceForm.get('invoiceItemList');
  }
}
