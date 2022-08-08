import { getConfiguration } from './interface'

export function isSystemPage(tab) {
    return tab.active && isSystemLink(tab.url)
}

export function isSystemLink(link) {
    return (
        link.startsWith('chrome://') ||
        link.startsWith('chrome-extension://') ||
        link.startsWith('chrome-search://')
    )
}

export async function retrieveToken() {
    return await getConfiguration('nodraft-extension-token')
}
