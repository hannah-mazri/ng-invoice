import { LayoutStateService } from './services/layout-state.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceStateService } from './services/invoice-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mobile: any = null;
  invoiceModal$: Observable<boolean> = this.layoutState.$invoiceModal;
  modalActive$: Observable<boolean> = this.layoutState.$modalActive;
  invoicesLoaded$: Observable<boolean> = this.invoiceState.$invoicesLoaded;

  constructor(
    private layoutState: LayoutStateService,
    private invoiceState: InvoiceStateService
  ) {}

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 750) {
      this.mobile = true;
      return;
    }
    this.mobile = false;
  }

  ngOnInit() {
    const data = this.invoiceState.getInvoices();
    console.log('get invoices', data);
  }
}
