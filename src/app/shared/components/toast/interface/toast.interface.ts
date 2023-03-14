import {
  TToast,
  TToastHPosition,
  TToastTranslate,
  TToastVPosition,
} from '../types/toast-type.types';

export interface IToast {
  autohide?: boolean;
  animation?: boolean;
  delay?: number;
  horizintalPosition?: TToastVPosition;
  verticalPosition?: TToastHPosition;
  translatePosition?: TToastTranslate;
  button?: 'close' | string;
  type?: TToast;
  text: string;
}
