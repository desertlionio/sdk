/* eslint-disable */
/* ts-ignore */

let isInitiated = false;
export const storagePlugin = {
  name: 'bugflow/storage@1',
  observer(cb: Function) {
    if (isInitiated) {
      return () => null;
    }

    isInitiated = true;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (!key) {
        continue;
      }

      const value = localStorage.getItem(key);

      cb({
        event: {
          type: 'storage',
          key,
          value,
        },
        timestamp: Date.now(),
      });
    }

    return () => null;
  },
  options: {},
};
