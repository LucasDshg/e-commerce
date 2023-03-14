import { DOCUMENT } from '@angular/common';
import { ComponentRef, inject, Inject, Injectable } from '@angular/core';
import { ToastConfig } from '../config/toast.config';
import { IToast } from '../interface/toast.interface';
import { ToastComponent } from '../toast.component';
// @ts-ignore
import { Toast } from 'bootstrap';
import { CreateComponentService } from '@shared/services/create-component/create-component.service';
import { ViewRefReturn } from '@shared/services/create-component/types/create-component.types';

@Injectable()
export class ToastService {
  private _container: HTMLElement | undefined = undefined;
  private _toastList: Array<{ element: HTMLElement; toast: Toast }> = [];
  private _document = inject(DOCUMENT);
  constructor(private _service: CreateComponentService) {}

  show(data: IToast): ViewRefReturn {
    const create = this._service.create(ToastComponent);
    const element = create.rootNodeElement.firstChild as HTMLElement;
    create.componentRef.instance.data = new ToastConfig(
      element,
      data,
    ).toastConfig;

    this._toastContainer(create.componentRef.instance.data);
    this._container!.append(element);

    setTimeout(() => {
      const toast = new Toast(element);
      this._toastList.push({ element, toast });
      toast.show();
      this._closedEnvent(element, create.componentRef);
    }, 100);

    return { afterDismissed: create.componentRef.instance.afterClosed() };
  }

  close(
    element: HTMLElement,
    componentRef: ComponentRef<ToastComponent>,
  ): void {
    const obj = this._toastList.find((i) => i.element.id === element.id);

    if (obj) {
      obj.toast!.hide();
      obj.element!.remove();
      this._service.destroy(componentRef);
    }
  }

  private _toastContainer(data: IToast): void {
    const container = this._document.body.querySelector(
      '.toast-live[aria-live="polite"]',
    );
    if (!!container) {
      this._container = container.firstChild as HTMLElement;
      return;
    }
    const div = this._document.createElement('div');
    div.setAttribute('aria-live', 'polite');
    div.setAttribute('aria-atomic', 'true');
    div.classList.add('toast-live');

    this._container = this._document.createElement('div');
    this._container.classList.add(
      'toast-container',
      'position-absolute',
      'p-3',
      data.horizintalPosition!,
      data.verticalPosition!,
    );

    if (data.translatePosition)
      this._container.setAttribute('class', data.translatePosition!);

    div.append(this._container);
    this._document.body.appendChild(div);
  }

  private _closedEnvent(
    element: HTMLElement,
    componentRef: ComponentRef<ToastComponent>,
  ): void {
    element.addEventListener('hidden.bs.toast', () =>
      this.close(element, componentRef),
    );
  }
}
