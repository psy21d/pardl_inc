/* 
  psy21d 
  Apche 2.0 licensed
*/
import { FormUrlParams } from "../types/breathSocket.types";

export function formUrl({ record, resampleFrom, url }: FormUrlParams): string {
  return `${url}?record=${record}&resample_from=${resampleFrom}`;
}
