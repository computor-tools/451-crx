async function hasActiveTabs() {
    const tabs = await chrome.tabs.query({ active: true });
    return tabs.length > 0;
}

chrome.runtime.onMessage.addListener(async (message) => {
    if (message.popupClosed) {
        if (await hasActiveTabs) {
            self.serviceWorker.postMessage({
                command: 'LOGOUT',
            });
        }
    }
});
