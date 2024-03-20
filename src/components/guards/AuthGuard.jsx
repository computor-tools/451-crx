import { Navigate } from '@solidjs/router';
import { createEffect } from 'solid-js';

import entity from '@/signals/entity';

export default function AuthGuard(props) {
    createEffect(() => {
        if (!entity()?.id) {
            return () => <Navigate href="/login" />;
        }
    });

    return <>{props.children}</>;
}
