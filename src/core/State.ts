interface IState {
  userIdentifier?: string | null;
  appIdentifier: string | null;
  events: Array<CustomRRWebEvent>;
  isInitialized: boolean;
  sessionId: string | null;
  currentUrl: string | null;
}

const INITIAL_STATE = {
  userIdentifier: null,
  appIdentifier: null,
  sessionId: null,
  events: [],
  isInitialized: false,
  currentUrl: null,
};

class State {
  public state: IState = INITIAL_STATE;

  init(state: Pick<IState, 'userIdentifier' | 'appIdentifier'>) {
    const storedId = window?.sessionStorage?.getItem('desertlion_id');

    this.state.isInitialized = true;

    this.setState({
      ...state,
      sessionId: storedId ?? null,
    });
  }

  reset() {
    this.setState(INITIAL_STATE);
  }

  setState(state: Partial<IState>): void {
    if (!this.state.isInitialized) {
      return;
    }

    if (state.sessionId) {
      window?.sessionStorage?.setItem('desertlion_id', state.sessionId);
    }

    this.state = {
      ...this.state,
      ...state,
    };
  }
}

export default new State();
