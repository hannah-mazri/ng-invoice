import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import db from '../../firebase/firebaseInit';
import { StateService } from '../shared/state.service';

interface InvoiceState {
  invoiceData: [];
  invoicesLoaded: false;
}

const initialState: InvoiceState = {
  invoiceData: [],
  invoicesLoaded: false,
};

@Injectable({
  providedIn: 'root',
})
export class InvoiceStateService extends StateService<InvoiceState> {
  $invoiceData: Observable<any> = this.select((state) => state.invoiceData);
  $invoicesLoaded: Observable<boolean> = this.select(
    (state) => state.invoicesLoaded
  );

  constructor() {
    super(initialState);
  }

  async getInvoices() {
    const getData = db.collection('invoices');
    const results = await getData.get();

    results.forEach((doc) => {
      this.$invoiceData.pipe().subscribe((invoiceData) => {
        if (!invoiceData.some((invoice: any) => invoiceData.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };

          this.setInvoiceData(data);
        }
      });
    });

    this.loadInvoices(true);
  }

  setInvoiceData(payload: any) {
    this.setState({ invoiceData: payload });
  }

  loadInvoices(payload: any) {
    this.setState({ invoicesLoaded: payload });
  }
}
