import state from '../../core/State';

let isInitiaited = false;
export const routerPlugin = {
  name: 'bugflow/router@1',
  observer(cb: Function) {
    if (isInitiaited) {
      return () => null;
    }

    isInitiaited = true;

    if (window['MutationObserver']) {
      const body = document?.querySelector('body');
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
          if (state.state.currentUrl !== document.location.href) {
            state.setState({
              currentUrl: document.location.href,
            });

            const nextDataElement = document.querySelector('#__NEXT_DATA__');

            cb({
              event: {
                type: 'load',
                url: document.location.href,
                nextData: nextDataElement?.innerHTML,
              },
              timestamp: Date.now(),
            });
          }
        });
      });

      observer.observe(body as HTMLBodyElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => null;
  },
  options: {},
};
