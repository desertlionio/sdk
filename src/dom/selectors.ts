import { finder } from './finder';

export function getSelector(event: Event, dataAttribute?: string): string {
  const cssSelector = require('css-selector-generator');
  if (event.target instanceof Element) {
    if (dataAttribute && event.target.getAttribute(dataAttribute)) {
      return `[${dataAttribute}="${event.target.getAttribute(dataAttribute)}"]`;
    }

    const candidate = cssSelector?.getCssSelector(event.target) as
      | string
      | null;

    if (candidate) {
      return candidate;
    }

    return finder(event.target);
  }

  return '';
}
