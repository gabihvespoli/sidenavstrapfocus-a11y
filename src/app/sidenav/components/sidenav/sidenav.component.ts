import {
  ConfigurableFocusTrapFactory,
  ConfigurableFocusTrap,
} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private focusTrap!: ConfigurableFocusTrap;

  constructor(
    private configurableFocusTrapFactory: ConfigurableFocusTrapFactory
  ) {}

  toggleSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
      this.releaseFocusTrap();
    } else {
      this.sidenav.open();
      this.createFocusTrap();
    }
  }

  private createFocusTrap() {
    if (this.sidenav.mode === 'over' && this.sidenav.position === 'end') {
      const element = this.sidenav._content.nativeElement;
      this.focusTrap = this.configurableFocusTrapFactory.create(element);
      this.focusTrap.focusInitialElement();
    }
  }

  private releaseFocusTrap() {
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
