import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';

@NgModule({
  declarations: [InvoiceDetailComponent, InvoiceListComponent, InvoicePreviewComponent],
  imports: [CommonModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
