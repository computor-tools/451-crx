export const login = (seed) => {
    navigator.serviceWorker.ready.then(() =>
        navigator.serviceWorker.controller.postMessage({
            command: 'LOGIN',
            seed,
            index: 0,
        })
    );
};

export const logout = () => {
    navigator.serviceWorker.ready.then(() =>
        navigator.serviceWorker.controller.postMessage({
            command: 'LOGOUT',
        })
    );
};
