type InstrumentItems = 'error' | 'unhandledRejection';
type Handler = (data: any) => void;

export class Instrument {
  handlers: {
    [key in InstrumentItems]?: Handler;
  } = {};
  instrumented: { [key in InstrumentItems]?: boolean } = {
    error: false,
    unhandledRejection: false,
  };

  start = (): void => {
    this.instrument();
  };

  instrument = (): void => {
    this.instrumentError();
    this.instrumentUnhandledRejection();
  };

  addHandler = (type: InstrumentItems, handler: Handler): void => {
    this.handlers[type] = handler;
  };

  handle = (type: InstrumentItems, params: Record<string, any>): void => {
    if (this.handlers[type]) {
      this.handlers[type]?.(params);
    }
  };

  instrumentError = (): void => {
    if (this.instrumented['error']) {
      return;
    }

    window?.addEventListener('error', event => {
      if (/Script error\.?/.test(event.error.message)) {
        return false;
      }

      this.handle('error', event);
    });

    this.instrumented['error'] = true;
  };

  instrumentUnhandledRejection = (): void => {
    if (this.instrumented['unhandledRejection']) {
      return;
    }

    window?.addEventListener('unhandledrejection', (error: any) => {
      this.handle('unhandledRejection', error);
    });

    this.instrumented['unhandledRejection'] = true;
  };
}
