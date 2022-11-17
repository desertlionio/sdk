import errorStackParser from 'error-stack-parser';

import state from './State';

import { Instrument } from './Instrument';
import { Recorder } from './Record';
import { Socket } from './Socket';

type InitParams = {
  appIdentifier: string;
  userIdentifier?: string | null;
};

export class Manager {
  recorder: Recorder | null = null;
  socket: Socket | null = null;
  instrument: Instrument | null = null;

  isInitialized = false;

  async init(params: InitParams): Promise<void> {
    return new Promise(resolve => {
      if (typeof window === 'undefined') {
        return;
      }

      if (window?.$$DESERTLION__isReplay) {
        console.log('ABORTING: desert lion is in reply mode');
        return;
      }

      if (!params.appIdentifier) {
        return;
      }

      if (state.state.isInitialized) {
        return;
      }

      state.init({
        appIdentifier: params.appIdentifier,
        userIdentifier: params.userIdentifier,
      });

      this.socket = new Socket();

      this.recorder = new Recorder({
        handleCheckout: this.onCheckout,
      });
      this.instrument = new Instrument();

      this.socket.start();
      this.recorder.start();
      this.instrument.start();

      this.instrument.addHandler('error', this.onError);
      this.instrument.addHandler(
        'unhandledRejection',
        this.onUnhandledRejection
      );

      this.isInitialized = true;
      resolve();
    });
  }

  identifyUser(userIdentifier: string) {
    if (!this.isInitialized) {
      return;
    }

    state.setState({
      userIdentifier,
    });

    this.socket?.identifyUser(userIdentifier);
  }

  onError = async (errorEvent: ErrorEvent): Promise<void> => {
    try {
      const error = errorEvent.error;
      const stack = errorStackParser.parse(error);
      // fix the lineNumber from the error event6
      const issue: Issue = {
        exception: {
          message: error?.message,
          stackTrace: stack || [],
          errorClass: error?.name,
          location: {
            fileName: error?.fileName || errorEvent.filename,
            line:
              typeof error.lineNumber !== 'undefined'
                ? error.lineNumber
                : errorEvent.lineno || 0,
            column:
              typeof error.columnNumber !== 'undefined'
                ? error.columnNumber
                : errorEvent.colno || 0,
            url: document?.location.href,
          },
        },
        timestamp: new Date().getTime(),
      };

      document?.dispatchEvent(
        new CustomEvent('desertlion:error', { detail: issue })
      );
      this.socket?.createIssue(issue);
    } catch (error) {}
  };

  onUnhandledRejection = async (event: {
    reason: any;
    promise: Promise<any>;
    detail: {
      reason: any;
      promise: Promise<any>;
    };
  }): Promise<void> => {
    let stack;
    const info: UnhandledRejectionInfo = {
      reason: null,
      promise: null,
      detail: null,
    };

    try {
      throw new Error();
    } catch (error: any) {
      stack = errorStackParser.parse(error);
    }

    try {
      info.reason = event.reason;
      /* eslint-disable no-empty */
    } catch (error) {}

    try {
      info.promise = event.promise;
      /* eslint-disable no-empty */
    } catch (error) {}

    try {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      info.detail = event.detail;

      if (info.detail && !info.reason) {
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        info.promise = info?.detail?.promise;
        info.reason = info.detail.reason;
      }
    } catch (error) {}

    const errorMessage = this.getUnahndledRejectionMessage(info);

    const issue = {
      exception: {
        message: errorMessage || info.reason,
        stackTrace: stack || '',
        errorClass: 'UnhandledRejection',
        location: null,
      },
      timestamp: new Date().getTime(),
    };

    document?.dispatchEvent(
      new CustomEvent('desertlion:error', { detail: issue })
    );

    await this.onCheckout();
    this.socket?.createIssue(issue);
  };

  onCheckout = async (): Promise<void> => {
    await this.socket?.checkoutRRweb();
  };

  private getUnahndledRejectionMessage(info: UnhandledRejectionInfo) {
    if (!info.reason) {
      return null;
    }

    if (info?.reason?.message) {
      /* eslint-disable @typescript-eslint/no-unsafe-return */
      return info?.reason?.message;
    }

    try {
      return JSON.stringify(info.reason);
    } catch (error) {
      return null;
    }
  }
}
