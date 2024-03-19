async function hasActiveTabs() {
    const tabs = await chrome.tabs.query({ active: true });
    return tabs.length > 0;
}

chrome.tabs.onRemoved.addListener(async () => {
    if (!(await hasActiveTabs)) {
        self.serviceWorker.postMessage({
            command: 'LOGOUT',
        });
    }
});
