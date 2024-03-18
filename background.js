console.log('Hello from background.js');

chrome.runtime.onConnect.addListener(function (port) {
    console.log('Port connected:', port);

    if (port.name === 'popup') {
        port.onDisconnect.addListener(function () {
            console.log('Popup closed');
            chrome.tabs.query({ active: true }, function (tabs) {
                if (tabs.length === 0) {
                    navigator.serviceWorker.ready
                        .then(function (registration) {
                            registration.active.postMessage({ command: 'LOGOUT' });
                        })
                        .catch(function (error) {
                            console.error('Service worker not ready:', error);
                        });
                }
            });
        });
    }
});
