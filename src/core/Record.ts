import { routerPlugin } from './../rrweb/plugins/router';

import rrwebRecord from 'rrweb/lib/record/rrweb-record';
import { getRecordConsolePlugin } from 'rrweb/lib/plugins/console-record';

import { capturePlugin } from '../rrweb/plugins/capture';
import { networkPlugin } from '../rrweb/plugins/network';
import { metaPlugin } from '../rrweb/plugins/meta';
import { storagePlugin } from '../rrweb/plugins/storage';
import { issuesPlugin } from '../rrweb/plugins/issues';

import state from './State';

export class Recorder {
  constructor(private params: { handleCheckout: () => void }) {}

  start(): void {
    rrwebRecord({
      emit: (event: CustomRRWebEvent, isCheckout?: boolean) => {
        state.setState({
          events: [...state.state.events, event],
        });

        if (state.state.events?.length > 10) {
          this.params.handleCheckout();
        }
      },
      plugins: [
        routerPlugin,
        metaPlugin,
        networkPlugin,
        capturePlugin,
        storagePlugin,
        issuesPlugin,
        getRecordConsolePlugin(),
      ],
      sampling: {
        scroll: 150,
        media: 800,
      },
    });
  }
}
