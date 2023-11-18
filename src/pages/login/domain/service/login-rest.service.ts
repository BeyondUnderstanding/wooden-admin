import { fromPromise } from '@most/core';
import { Stream } from '@most/types';
import axios from 'axios';
import { either } from 'fp-ts';
import { Either } from 'fp-ts/lib/Either';

export interface AuthArgs {
    readonly login: string;
    readonly password: string;
}

interface AuthResponce {
    readonly access_token: string;
    readonly refresh_token: string;
}

export interface LoginService {
    readonly auth: (
        data: AuthArgs
    ) => Stream<Either<string, AuthResponce>>;
}
const domain = 'http://master.wooden_backend.staginator.local/v1/admin';

const API = {
    auth: `${domain}/auth`,
};

export const newLoginService = (): LoginService => ({
    auth: (data) =>
        fromPromise(
            axios
                .post<AuthResponce>(API.auth, data)
                .then((resp) => either.right(resp.data))
                .catch((error) => error.response.status == 401
                    ? either.left('Bad username or password')
                    : either.left('Something goes wrong'))
        ),
});
