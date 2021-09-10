import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {
  InvoiceData,
  InvoiceStateService,
} from 'src/app/services/invoice-state.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  currentInvoice: any;
  currentInvoice$: Observable<InvoiceData> = this.invoiceState.$currentInvoice;

  constructor(
    private route: ActivatedRoute,
    private invoiceState: InvoiceStateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const invoiceId = params.get('invoiceId');
      if (invoiceId) {
        this.invoiceState.getCurrentInvoice(invoiceId);
        this.currentInvoice$.subscribe((data) => {
          this.currentInvoice = data;
        });
      }
    });
  }

  updateStatusToPaid(docId: string) {}
  updateStatusToPending(docId: string) {}
  deleteInvoice(docId: string) {}
  toggleEditInvoice(docId: string) {}
}
