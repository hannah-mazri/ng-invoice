import { LayoutStateService } from './services/layout-state.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceStateService } from './services/invoice-state.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('800ms ease', style({ transform: 'translateX(-110px)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(-110px)' }),
        animate('800ms ease', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
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
    this.invoiceState.getInvoices();
  }
}
