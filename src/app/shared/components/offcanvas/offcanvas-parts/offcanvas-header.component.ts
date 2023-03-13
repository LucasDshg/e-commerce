import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-offcanvas-header',
  template: `
    <div class="offcanvas-header">
      <ng-content select=".offcanvas-title"></ng-content>

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        *ngIf="!hideCloseButton"
      ></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffcanvasHeaderComponent {
  @Input() hideCloseButton: boolean = false;
}
