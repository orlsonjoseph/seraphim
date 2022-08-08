import { isSystemPage, isSystemLink } from '../../common/helpers'

import {
    AUTH_URL,
    LOGOUT_URL,
    POCKET_HOME,
    POCKET_LIST,
} from '../../common/constants'

export function extensionClicked(tab) {
    console.log("clicked");
    if (isSystemPage(tab)) return openPocketHome() // open list on non-standard pages

    const { id: tabId, title, url: pageUrl } = tab
    // save({ pageUrl, title, tabId })
}

export function openHome() {
    chrome.tabs.create({ url: NODRAFT_HOME })
}