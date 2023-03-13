import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TOffcanvasPosition } from './types/offcanvas.types';
import { randomId } from '@utils/functions';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffcanvasComponent {
  @Input() position: TOffcanvasPosition = 'offcanvas-end';
  @Input() backdrop: boolean = true;
  @Input() scroll: boolean = false;

  id: string = randomId('offcanvas');
}
