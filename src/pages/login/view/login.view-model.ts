import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { injectable, token } from '@injectable-ts/core';
import { LoginService } from '../domain/service/login-rest.service';
import { newLensedAtom } from '@frp-ts/lens';
import { LoginForm } from './login.component';
import { constVoid, pipe } from 'fp-ts/lib/function';
import { chain, tap } from '@most/core';
import { createAdapter } from '@most/adapter';
import Cookies from 'js-cookie';
import { either } from 'fp-ts';
import { redirect } from 'react-router';

interface LoginViewModel {
    readonly onChange: (data: Partial<LoginForm>) => void;
    readonly onClick: () => void;
}

type NewLoginViewModel = ValueWithEffect<LoginViewModel>;

export const newLoginViewModel = injectable(
    token('service')<LoginService>(),
    (service): NewLoginViewModel => {
        const form = newLensedAtom({
            login: '',
            password: '',
        });

        const [onClick, onClickEvent] = createAdapter<void>();

        const onClickEffect = pipe(
            onClickEvent,
            chain((_) => service.auth(form.get())),
            tap((x) =>
                pipe(
                    x,
                    either.fold(constVoid, (tokens) => {
                        Cookies.set('access_token', tokens.access_token);
                        Cookies.set('refresh_token', tokens.refresh_token);
                        window.location.href = '/';
                    })
                )
            )
        );

        return valueWithEffect.new(
            {
                onChange: (data) =>
                    form.modify((form) => ({ ...form, ...data })),
                onClick,
            },
            onClickEffect
        );
    }
);
