import { getCoordinates } from '../../dom/coordinates';
import { getKeyCode, getText } from '../../dom/events';
import { getSelector } from '../../dom/selectors';

let isInitiaited = false;
export const capturePlugin = {
  name: 'bugflow/cpature@1',
  observer(cb: Function) {
    if (isInitiaited) {
      return () => null;
    }

    isInitiaited = true;

    'click change keydown select submit'.split(' ').forEach(type => {
      window?.addEventListener(
        type,
        event => {
          try {
            const selector = getSelector(event);
            const coordinates = getCoordinates(event);
            const target = event.target as Element;
            const keyCode = getKeyCode(event as KeyboardEvent);
            const text = getText(event);

            cb({
              event: {
                type: 'domEvent',
                value: target instanceof HTMLInputElement && target.value,
                tagName: target.tagName,
                action: event.type,
                keyCode,
                href:
                  target instanceof HTMLAnchorElement && target?.href
                    ? target.href
                    : window?.location?.href,
                coordinates,
                selector,
                text,
              },
              timestamp: Date.now(),
            });
          } catch (error) {
            return;
          }
        },
        true
      );
    });

    return () => null;
  },
  options: {},
};
