import { isSystemPage, isSystemLink } from '../../common/helpers'
import { getConfiguration, setConfiguration } from '../../common/interface'

import { saveSuccess } from './postsave'

import { customRequest } from '../../common/api/request/request'
import saveBookmark from '../../common/api'

import { NODRAFT_AUTH, NODRAFT_HOME } from '../../common/constants'

import { SAVE_TO_NODRAFT_REQUEST, SAVE_TO_NODRAFT_SUCCESS, SAVE_TO_NODRAFT_FAILURE } from '../../actions'

var postAuthSave = null;

export function extensionClicked(tab) {
    if (isSystemPage(tab)) return openHome()

    const { id: tabId, title, url: pageUrl, favIconUrl } = tab
    save({ tabId, title, favIconUrl, pageUrl })
}

export function openHome() {
    chrome.tabs.create({ url: NODRAFT_HOME })
}

async function save({ tabId, title, favIconUrl, pageUrl, linkUrl }) {
    const access_token = await getConfiguration('nodraft-extension-token');
    if (!access_token) return logIn({ tabId, title, favIconUrl, pageUrl, linkUrl })

    const url = linkUrl || pageUrl;
    // chrome.tabs.sendMessage(tabId, { action: SAVE_TO_NODRAFT_REQUEST })

    try {
        const payload = await saveBookmark({ tabId, title, favIconUrl, url })

        const message = payload
            ? { action: SAVE_TO_NODRAFT_SUCCESS, payload }
            : { action: SAVE_TO_NODRAFT_FAILURE, payload }

        // chrome.tabs.sendMessage(tabId, message)

        if (payload) saveSuccess(tabId, { ...payload, isLink: Boolean(linkUrl) })
    } catch (error) {
        // If it is an auth error let's redirect the user
        if (error?.xErrorCode === '107') {
            return logIn({ linkUrl, pageUrl, title, tabId })
        }

        // Otherwise let's just show the error message
        const errorMessage = { action: SAVE_TO_NODRAFT_FAILURE }
        chrome.tabs.sendMessage(tabId, errorMessage)
    }
}

export function logIn(saveObject) {
    postAuthSave = saveObject

    chrome.tabs.create({ url: NODRAFT_AUTH })
}
