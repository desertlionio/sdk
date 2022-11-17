import { Manager } from '../../src/core/Manager';
import State from '../../src/core/State';

const APP_IDENTIFIER = '123';

global.fetch = jest.fn(() => Promise.resolve(new Response()));

describe('Manager', () => {
  it('should abort if app identifer not provided', () => {
    const manager = new Manager();
    manager.init({ appIdentifier: '' });
    expect(manager.isInitialized).toBe(false);
  });
  it('should be initialized correctly', () => {
    const manager = new Manager();
    manager.init({ appIdentifier: APP_IDENTIFIER });
    expect(manager.isInitialized).toBe(true);
  });
});
