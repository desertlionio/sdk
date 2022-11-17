let isInitiaited = false;

export const metaPlugin = {
  name: 'bugflow/meta@1',
  observer(cb: Function) {
    if (isInitiaited) {
      return () => null;
    }

    isInitiaited = true;
    cb({
      event: {
        type: 'meta',
        height: window?.innerHeight,
        width: window?.innerWidth,
        href: window?.location.href,
      },
      timestamp: Date.now(),
    });

    window?.addEventListener(
      'resize',
      () => {
        cb({
          event: {
            type: 'meta',
            height: window?.innerHeight,
            width: window?.innerWidth,
          },
          timestamp: Date.now(),
        });
      },
      true
    );

    return () => null;
  },
  options: {},
};
