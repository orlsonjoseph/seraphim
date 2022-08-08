import { extensionClicked } from './actions'

chrome.action.onClicked.addListener(extensionClicked);
