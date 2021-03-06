import { LayoutStateService } from './../../services/layout-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoiceModal$: Observable<boolean> = this.layoutState.$invoiceModal;

  constructor(private layoutState: LayoutStateService) {}

  ngOnInit(): void {}

  closeInvoice() {
    this.layoutState.toggleInvoice();
  }
}
