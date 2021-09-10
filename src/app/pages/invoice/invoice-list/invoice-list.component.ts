import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  InvoiceData,
  InvoiceStateService,
} from 'src/app/services/invoice-state.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  invoiceData$: Observable<InvoiceData[]> = this.invoiceState.$invoiceData;
  constructor(private invoiceState: InvoiceStateService) {}

  ngOnInit(): void {
    this.invoiceState.getInvoices();
  }
}
