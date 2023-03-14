import { IToast } from './interface/toast.interface';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TOAST_ICON_COLOR } from './constants/toast.constants';
import { randomId } from '@utils/functions';

@Component({
  selector: 'app-toast[data]',
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnDestroy {
  id: string = randomId('toast');
  data!: IToast;
  toastIcon = TOAST_ICON_COLOR;
  private _onClosed$ = new Subject<any>();

  ngOnDestroy(): void {
    this._onClosed$.next(undefined);
    this._onClosed$.complete();
  }
  afterClosed(): Observable<any> {
    return this._onClosed$.asObservable();
  }
}
