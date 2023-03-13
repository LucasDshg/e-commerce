import { TOffcanvasPosition } from '../types/offcanvas.types';

export interface IOffcanvas {
  position?: TOffcanvasPosition;
  backdrop?: boolean;
  scroll?: boolean;
  data?: object;
}
