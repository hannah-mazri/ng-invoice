import { LayoutStateService } from './services/layout-state.service';
import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      state('*', style({ zIndex: '10' })),
      transition(':enter', [
        style({ transform: 'translateX(-700px)' }),
        animate('500ms ease-in'),
      ]),
      transition(':leave', [
        animate(
          '500ms ease',
          style({ transform: 'translateX(-700px)', overflowY: 'hidden' })
        ),
      ]),
    ]),
  ],
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
