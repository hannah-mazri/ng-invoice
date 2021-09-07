import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mobile: any = null;

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
