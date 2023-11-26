import { Button } from '../../../components/button/button.component';
import { Input } from '../../../components/input/input.component';
import React from 'react';

import css from './login.module.css';

export interface LoginForm {
    readonly login: string;
    readonly password: string;
}

export interface LoginProps {
    readonly onClick: () => void;
    readonly onChange: (data: Partial<LoginForm>) => void;
}

export const Login = ({ onChange, onClick }: LoginProps) => {
    return (
        <div className={css.wrap}>
            <h2 className={css.title}>WoodenGames</h2>
            <Input
                type={'text'}
                onChange={(data) => onChange({ login: data })}
                placeholder="Login"
            />
            <Input
                type={'password'}
                onChange={(data) => onChange({ password: data })}
                placeholder="Password"
            />
            <Button
                label={'Login'}
                onClick={onClick}
                disabled={false}
                type={'def'}
                theme={[css.button]}
            />
        </div>
    );
};
