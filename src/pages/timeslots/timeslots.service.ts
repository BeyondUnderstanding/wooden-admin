import { Either } from 'fp-ts/lib/Either';
import { Stream } from '@most/types';
import { fromPromise } from '@most/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { either } from 'fp-ts';
import { domain } from '../../entry-api';
import { GridDataResponse } from './timeslots/timeslots.model';
import { logout } from '../../utils/rest.utils';

export interface TimeSlotsService {
    readonly getByMontYear: (
        m: number,
        y: number
    ) => Stream<Either<string, GridDataResponse>>;
    readonly closeSlot: (isoDate: string) => Stream<Either<string, string>>;
}

const API = {
    grid: `${domain}/orders/grid/`,
    close: `${domain}/orders/grid/close`,
};

export const newTimeSlotsService = (): TimeSlotsService => ({
    getByMontYear: (m, y) =>
        fromPromise(
            axios
                .get<ReadonlyArray<GridDataResponse>>(
                    `${API.grid}?year=${y}&month=${m}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data))
                .catch((error) => {
                    logout();
                    return either.left(
                        `Something goes wrong status = ${error.response.status}`
                    );
                })
        ),
    closeSlot: (isoDate) =>
        fromPromise(
            axios
                .post<string>(
                    API.close,
                    { timeslot: isoDate, all_day: true },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((resp) => either.right(resp.data))
                .catch((error) => {
                    // logout();
                    return either.left(
                        `Something goes wrong status = ${error.response.status}`
                    );
                })
        ),
});
