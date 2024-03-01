/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
	);
}

navigator.serviceWorker.getRegistration('./lrv.js').then((registration) => {
	if (registration === undefined) {
		navigator.serviceWorker.register('./lrv.js',  { scope: './', type: 'module' }).then(
			(registration) => console.log('Registration', registration),
			(error) => console.error(error),
		);
	}
});	

render(() => <App />, root);
