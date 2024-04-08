import { useNavigate } from '@solidjs/router';
import { SEED_LENGTH } from 'qubic-lrv';
import { createSignal } from 'solid-js';

import { Input } from '@/components/ui';
import { Button } from '@/components/ui/buttons';
import { login } from '@/utils/service-worker';

export default function Login() {
    const navigate = useNavigate();

    const [seed, setSeed] = createSignal('');
    const [disabled, setDisabled] = createSignal(false);
    const [errorMessage, setErrorMessage] = createSignal('');

    const handleOnInput = (event) => {
        if (event.currentTarget.value.length > 0 && !new RegExp(`^[a-z]{${event.currentTarget.value.length}}$`).test(event.currentTarget.value)) {
            event.preventDefault();
            setErrorMessage('Only lowercase latin characters are allowed.');
        } else {
            if (event.currentTarget.value.length > SEED_LENGTH) {
                event.preventDefault();
                setErrorMessage(`Seed exceeds maximum length of ${SEED_LENGTH} characters.`);
            } else {
                setErrorMessage('');
            }
        }
    };

    const handleOnChange = (event) => {
        if (!disabled()) {
            setSeed(event.currentTarget.value);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (new RegExp(`^[a-z]{${SEED_LENGTH}}$`).test(seed())) {
            setDisabled(true);

            navigator.serviceWorker.addEventListener('message', function redirect(event) {
                if (event.data.command === 'ENTITY') {
                    if (event.data.entity.id) {
                        navigate('/', { replace: true });
                        navigator.serviceWorker.removeEventListener('message', redirect);
                    }
                }
            });

            login(seed());
        } else {
            setErrorMessage(`Invalid seed! Expected ${SEED_LENGTH} lowercase latin characters.`);
        }
    };

    return (
        <div class="w-[var(--vw)] h-[var(--vh)]">
            <main class="h-[var(--container-height)] w-full px-8 pb-10 pt-20">
                <div class="flex flex-col gap-10 justify-center items-center">
                    <p class="text-center dark:text-zinc-300">
                        Enter a <em>secret seed</em> of 55 lowercase latin characters.
                        <br />
                        The seed will always be required to access your account.
                        <br />
                        Create backups of it and keep them in secure places.
                    </p>
                    <form class="grid gap-6 border-t border-gray-200 pt-10 mt-4 dark:border-zinc-800" onSubmit={handleFormSubmit}>
                        <Input type="password" label="Seed" color="primary" onInput={handleOnInput} onChange={handleOnChange} errorMessage={errorMessage()} />
                        <Button type="submit" disabled={disabled()}>
                            Login
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
