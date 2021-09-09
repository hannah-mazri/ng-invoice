import { LayoutStateService } from './../../services/layout-state.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { uid } from 'uid';
import db from '../../../firebase/firebaseInit';

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
  @ViewChild('invoiceWrapRef') invoiceWrapRef: any;
  invoiceForm!: FormGroup;
  invoiceItemList!: FormArray;
  invoiceDateUnix = Date.now();
  paymentDueDateUnix = 0;

  loading = false;
  invoicePending = false;
  invoiceDraft = false;

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

      invoiceItemList: this.fb.array([this.createItem()]),
      invoiceTotal: 0,
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: uid(),
      itemName: '',
      qty: 0,
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
    this.invoiceItems.push(this.createItem());
  }

  deleteInvoiceItem(i: number) {
    this.invoiceItems.removeAt(i);
  }

  prt(item: any, i: number) {
    console.log(
      'Exposed item name:',
      this.invoiceItems.controls[i].value.total
    );
  }

  get invoiceItems() {
    return <FormArray>this.invoiceForm.get('invoiceItemList');
  }

  calItemTotal(qty: number, price: number, item: any) {
    item.value.total = qty * price;
    return item.value.total;
  }

  calInvoiceTotal() {
    this.invoiceForm.value.invoiceTotal = 0;

    this.invoiceItems.value.forEach((item: any) => {
      this.invoiceForm.value.invoiceTotal += item.total;
    });
  }

  publishInvoice() {
    this.invoicePending = true;
  }

  saveDraft() {
    this.invoiceDraft = true;
  }

  async uploadInvoice() {
    if (this.invoiceItems.controls.length <= 0) {
      alert('Please ensure you filled out work items!');
      return;
    }

    this.loading = true;
    this.calInvoiceTotal();

    const database = db.collection('invoices').doc();

    await database.set({
      invoiceId: uid(6),
      billerStreetAddress: this.invoiceForm.value.billerStreetAddress,
      billerCity: this.invoiceForm.value.billerCity,
      billerZipCode: this.invoiceForm.value.billerZipCode,
      billerCountry: this.invoiceForm.value.billerCountry,
      clientName: this.invoiceForm.value.clientName,
      clientEmail: this.invoiceForm.value.clientEmail,
      clientStreetAddress: this.invoiceForm.value.clientStreetAddress,
      clientCity: this.invoiceForm.value.clientCity,
      clientZipCode: this.invoiceForm.value.clientZipCode,
      clientCountry: this.invoiceForm.value.clientCountry,
      invoiceDate: this.invoiceForm.value.invoiceDate,
      paymentTerms: this.invoiceForm.value.paymentTerms,
      paymentDueDate: this.invoiceForm.value.paymentDueDate,
      productDescription: this.invoiceForm.value.productDescription,
      invoiceItemList: this.invoiceForm.value.invoiceItemList,
      invoiceTotal: this.invoiceForm.value.invoiceTotal,
    });

    this.loading = false;
    this.closeInvoice();
  }

  onSubmit() {
    this.uploadInvoice();
  }

  checkClick(event: any) {
    if (event.target === this.invoiceWrapRef.nativeElement) {
      this.layoutState.toggleModal();
    }
  }
}
