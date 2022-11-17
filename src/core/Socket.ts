import { config } from './config';
import state from './State';

type SocketEvents = 'init' | 'issue' | 'sync' | 'identifyUser';

const RECONNECT_TIMEOUT = 5 * 1000;
const RECONNECT_INTERVAL = 3 * 1000;
const MAX_RETRY_COUNT = 5;

export class Socket {
  socket: WebSocket = new WebSocket(config.wsUrl);

  reconnectIntervalId = 0;
  retryCount = 0;

  start(): void {
    this.socket.addEventListener('open', () => {
      clearInterval(this.reconnectIntervalId);
      this.retryCount = 0;

      this.sendMessage({
        event: 'init',
        data: {
          userIdentifier: state.state.userIdentifier,
          appId: state.state.appIdentifier,
          sessionId: state.state.sessionId,
          userAgent: navigator.userAgent,
        },
      }).catch(error => {
        return error;
      });
    });

    this.socket.addEventListener('message', event => this.onReceive(event));
    this.socket.addEventListener('close', () => {
      this.reconnect();
    });
  }

  reconnect = () => {
    setTimeout(() => {
      this.reconnectIntervalId = window?.setInterval(() => {
        if (this.retryCount === MAX_RETRY_COUNT) {
          window?.clearInterval(this.reconnectIntervalId);
          return;
        }

        this.retryCount++;
        this.socket = new WebSocket(config.wsUrl);
      }, RECONNECT_INTERVAL);
    }, RECONNECT_TIMEOUT);
  };

  async sendMessage(payload: {
    event: SocketEvents;
    data: Record<string, any>;
  }): Promise<void> {
    if (this.socket.readyState !== this.socket.OPEN) {
      try {
        await this.waitForOpenConnection().catch(() => {
          return;
        });
        this.socket.send(JSON.stringify(payload));
      } catch (error) {
        console.error(error);
      }
    } else {
      this.socket.send(JSON.stringify(payload));
    }
  }

  waitForOpenConnection(): Promise<null> {
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 10;
      const intervalTime = 300;

      let currentAttempt = 0;
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval);
          reject(new Error('connection failed'));
        } else if (this.socket.readyState === this.socket.OPEN) {
          clearInterval(interval);
          resolve(null);
        }
        currentAttempt++;
      }, intervalTime);
    });
  }

  onReceive(event: MessageEvent<string>): void {
    try {
      const data = JSON.parse(event.data) as {
        event: SocketEvents;
        id: string;
      };

      if (data.event === 'init' && data.id) {
        state.setState({
          sessionId: data.id,
        });
      }
    } catch (error) {
      return;
    }
  }

  async createIssue({ exception, timestamp }: Issue): Promise<void> {
    await this.sendMessage({
      event: 'issue',
      data: {
        exception,
        timestamp,
        sessionId: state.state.sessionId,
      },
    });
  }

  checkoutRRweb = async (): Promise<void> => {
    if (!state.state.sessionId) {
      return;
    }


    await this.sendMessage({
      event: 'sync',
      data: { sessionId: state.state.sessionId, events: state.state.events },
    });

    state.setState({
      events: [],
    });
  };

  identifyUser = async (userIdentifier: string): Promise<void> => {
    if (!state.state.sessionId) {
      return;
    }

    await this.sendMessage({
      event: 'identifyUser',
      data: { sessionId: state.state.sessionId, userIdentifier },
    });

    state.setState({
      events: [],
    });
  };
}
