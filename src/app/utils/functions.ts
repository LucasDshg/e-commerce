import { formatDate, formatNumber } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { PT_BR } from '@shared/constants/language.constant';

/**
 * Função utilizada para gerar id aleatorios.
 * @param name tipo string
 * @return - Retorna string
 * @example - 'button_201317838'
 *
 * @usageNotes
 *
 * ```ts
 *  const idButton: string = randomId('button')
 *  ...
 * ```
 * ### Nota
 * * In case of error will be throw exception`,
 *
 * @Annotation
 */
export function randomId(name: string): string {
  const array = new Uint32Array(10);
  const id = window.crypto.getRandomValues(array)[0];
  return `${name}_${id}`;
}

export const getValueForm = (name: string, form: FormGroup) =>
  form.get(name)!.value;
