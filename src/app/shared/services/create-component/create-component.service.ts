import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

@Injectable()
export class CreateComponentService {
  constructor(
    /** FIXED IN ANGULAR 14
     *  possibility to create component by service
     *  https://github.com/angular/angular/issues/45263
     *  https://github.com/angular/angular/pull/46685
     */
    private _factoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
  ) {}

  create<T>(component: Type<T>) {
    const componentRef = this._factoryResolver
      .resolveComponentFactory(component)
      .create(this._injector);

    this._appRef.attachView(componentRef.hostView);

    const root = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    return {
      componentRef: componentRef as ComponentRef<T>,
      rootNodeElement: root,
    };
  }

  destroy<T>(componentRef: ComponentRef<T>, calback?: any): void {
    this._appRef.detachView(componentRef.hostView);
    componentRef?.destroy();
    componentRef.hostView?.destroy();
    componentRef?.onDestroy(() => {
      if (calback) {
        calback();
      }
    });
  }
}
