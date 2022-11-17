import { Manager } from './core/Manager';

let manager: Manager;

function init(params: { appId: string; userIdentifier?: string }): void {
  manager = new Manager();
  manager.init({
    appIdentifier: params?.appId,
    userIdentifier: params?.userIdentifier,
  });
}

function identifyUser(params: { userIdentifier: string }): void {
  if (!manager) {
    return;
  }

  manager.identifyUser(params?.userIdentifier);
}

export default {
  init,
  identifyUser,
};
