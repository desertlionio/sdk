import state from '../../src/core/State';

const APP_IDENTIFIER = '123';

beforeEach(() => {
  state.init({ appIdentifier: APP_IDENTIFIER, userIdentifier: '' });
  state.reset();
});

describe('state', () => {
  it('should be initialized successfully', () => {
    state.init({ appIdentifier: APP_IDENTIFIER, userIdentifier: '' });
    expect(state.state.isInitialized).toBe(true);
  });
  it('should not allow setState if not initialized', () => {
    expect(state.setState.bind({})).toThrowError();
  });
  it('should change the state after calling setState', () => {
    state.init({ appIdentifier: APP_IDENTIFIER, userIdentifier: '' });
    state.setState({
      sessionId: '123',
    });
    expect(state.state.sessionId).toBe('123');
  });
});
