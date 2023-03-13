import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OffcanvasService } from '../service/offcanvas.service';

@Injectable()
export class OffcanvasRef<T = any> implements OnDestroy {
  private _onClosed = new Subject<T | undefined>();
  constructor(private _service: OffcanvasService) {}

  ngOnDestroy(): void {
    this._onClosed.complete();
  }

  afterClosed(): Observable<T | undefined> {
    return this._onClosed.asObservable();
  }

  close(value?: any): void {
    this._service.close(value);
  }
}
