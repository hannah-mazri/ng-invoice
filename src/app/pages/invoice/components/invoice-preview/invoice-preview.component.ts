import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
})
export class InvoicePreviewComponent implements OnInit {
  @Input() invoice: any;
  constructor() {}

  ngOnInit(): void {}
}
