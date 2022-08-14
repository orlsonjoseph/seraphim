import { contextClick, extensionClicked, setContextMenus, openHome } from './actions';
import { getConfiguration, setConfiguration } from './../../common/interface';

// Initialization
chrome.runtime.onInstalled.addListener(function () {
  setContextMenus()
})

// Context Menu
chrome.contextMenus.onClicked.addListener(contextClick)

chrome.action.onClicked.addListener(extensionClicked);

// Messaging
chrome.runtime.onMessage.addListener(function (message, sender) {
  const { type, payload } = message;
  const { tab } = sender;

  switch (type) {
    case OPEN_POCKET:
      openHome();
      return;
    default:
      return;
  }
});

// Exposes external endpoint for browser to set authentication token
chrome.runtime.onMessageExternal.addListener(function (request, sender) {
  if (request.token)
    setConfiguration({ 'nodraft-extension-token': request.token });
});
