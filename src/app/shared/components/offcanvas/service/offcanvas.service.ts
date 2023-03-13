import { DOCUMENT } from '@angular/common';
import { ComponentRef, inject, Injectable, Type } from '@angular/core';
import { IOffcanvas } from '../interfaces/offcanvas.interface';
//@ts-ignore
import { Offcanvas } from 'bootstrap';
import { OFFCANVAS_DATA } from '../constants/offcanvas.contants';
import { OffcanvasConfig } from '../config/offcanvas.config';
import { ViewRefReturn } from '@shared/services/create-component/types/create-component.types';
import { CreateComponentService } from '@shared/services/create-component/create-component.service';

@Injectable()
export class OffcanvasService {
  private _element: HTMLElement | undefined = undefined;
  private _componentRef: ComponentRef<any> | undefined = undefined;
  private _offcanvas: Offcanvas;
  private _document = inject(DOCUMENT);
  private _data = inject(OFFCANVAS_DATA);
  constructor(private _service: CreateComponentService) {}

  open<T>(component: Type<T>, settings?: IOffcanvas): ViewRefReturn {
    const create = this._service.create(component);
    this._componentRef = create.componentRef;
    this._element = create.rootNodeElement.firstChild
      ?.firstChild as HTMLElement;

    const configs = new OffcanvasConfig(this._element!, settings).config;

    Object.assign(this._data, settings?.data);

    this._document.body.append(create.rootNodeElement);

    this._offcanvas = new Offcanvas(this._element, configs);

    this._offcanvas.show();

    this._closedEvent();
    return { afterDismissed: this._componentRef!.instance.afterClosed() };
  }

  close(data?: any): void {
    if (data) {
      this._componentRef?.instance.onClosed.next(data);
    }
    this._offcanvas.hide();
    this._element?.remove();
    this._service.destroy(this._componentRef!);
  }

  private _closedEvent(): void {
    this._element?.addEventListener('hidden.bs.offcanvas', () => this.close());
  }
}
