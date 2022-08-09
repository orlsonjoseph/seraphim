import { getConfiguration } from './interface'

export function isSystemPage(tab) {
    return tab.active && isSystemLink(tab.url)
}

export function isSystemLink(link) {
    return (
        link.startsWith('chrome-extension://') ||
        link.startsWith('chrome-search://') ||
        link.startsWith('chrome://')
    )
}

export async function retrieveToken() {
    return await getConfiguration('nodraft-extension-token')
}
