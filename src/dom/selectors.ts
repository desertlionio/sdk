import { finder } from './finder';

export function getSelector(event: Event, dataAttribute?: string): string {
  if (event.target instanceof Element) {
    return finder(event.target);
  }

  return '';
}
