import { Show, createSignal } from 'solid-js';
import TxActions from './TxActions';

export default function TxHead(props) {
    const [errorMessage, setErrorMessage] = createSignal('');

    return (
        <div>
            <Show when={errorMessage()}>
                <span>{errorMessage()}</span>
            </Show>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">{props.children}</div>

                <TxActions retryText={props.retryText} accentColor={props.accentColor} setErrorMessage={(message) => setErrorMessage(message)} />
            </div>
        </div>
    );
}
