import { IOffcanvas } from '../interfaces/offcanvas.interface';
import { TOffcanvasPosition } from '../types/offcanvas.types';

export class OffcanvasConfig {
  constructor(element: HTMLElement, init?: Partial<IOffcanvas>) {
    this._element = element;
    if (init) {
      this._default = init;
    }
    this._setConfig();
  }

  private _element: HTMLElement | undefined = undefined;
  private _defaultConfig: IOffcanvas = {
    position: 'offcanvas-end',
    backdrop: true,
    scroll: false,
  };

  get config(): IOffcanvas {
    return this._defaultConfig;
  }

  private set _default(value: IOffcanvas) {
    this._defaultConfig = Object.assign(this.config, value);
  }

  private _setConfig(): void {
    this._position = this.config.position as TOffcanvasPosition;
    this._backdrop = this.config.backdrop as boolean;
    this._scroll = this.config.scroll as boolean;
  }

  private set _position(value: TOffcanvasPosition) {
    if (this._element) {
      this._element.classList.add(value);
    }
  }

  private set _backdrop(value: boolean) {
    if (this._element) {
      this._element.setAttribute('data-bs-backdrop', value.toString());
    }
  }
  private set _scroll(value: boolean) {
    if (this._element) {
      this._element.setAttribute('data-bs-scroll', value.toString());
    }
  }
}
