import { IToast } from '../interface/toast.interface';

export class ToastConfig {
  private _element: HTMLElement | undefined = undefined;
  private _defautlConfig: IToast = {
    autohide: true,
    animation: true,
    delay: 4000,
    horizintalPosition: 'bottom-0',
    verticalPosition: 'end-0',
    translatePosition: '',
    button: 'close',
    type: 'info',
    text: '',
  };

  private set _default(config: IToast) {
    this._defautlConfig = Object.assign(this._defautlConfig, config);
  }

  get toastConfig(): IToast {
    return this._defautlConfig;
  }

  constructor(element: HTMLElement, init?: IToast) {
    this._element = element;
    if (init) {
      this._default = init;
    }
    this.autohide();
    this.delay();
  }

  autohide(): void {
    this._element!.setAttribute(
      'data-bs-autohide',
      this.toastConfig.autohide!.toString(),
    );
  }

  delay(): void {
    this._element!.setAttribute(
      'data-bs-delay',
      this.toastConfig.delay!.toString(),
    );
  }
}
