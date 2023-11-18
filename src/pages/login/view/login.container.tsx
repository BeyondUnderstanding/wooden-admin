import React from 'react';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newLoginViewModel } from './login.view-model';
import { newLoginService } from '../domain/service/login-rest.service';
import { Login } from './login.component';

export const LoginContainer = () => {
    const vm = useValueWithEffect(
        () => newLoginViewModel({ service: newLoginService() }),
        []
    );

    return React.createElement(Login, { ...vm });
};
