import { LayoutStateService } from './services/layout-state.service';
import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mobile: any = null;
  invoiceModal$: Observable<boolean> = this.layoutState.$invoiceModal;

  constructor(private layoutState: LayoutStateService) {}

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
}
