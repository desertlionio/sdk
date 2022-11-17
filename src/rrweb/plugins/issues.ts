let isInitiated = false;

export const issuesPlugin = {
  name: 'desertlion/issues@1',
  observer(cb: Function) {
    if (isInitiated) {
      return () => null;
    }

    isInitiated = true;
    document?.addEventListener('desertlion:error', event => {
      const customEvent = event as CustomEvent;
      const issue = (customEvent?.detail as Issue) || {};

      cb({
        event: {
          type: 'error',
          ...issue,
        },
        timestamp: issue?.timestamp,
      });
    });
    return () => null;
  },
  options: {},
};
