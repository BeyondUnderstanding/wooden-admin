import { newLensedAtom } from '@frp-ts/lens';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../../../utils/run-view-model.utils';
import { Attributes, Game } from '../../../domain/model/game.model';
import { Property } from '@frp-ts/core';

export interface BaseInfoGame {
    title: string;
    description: string;
    price: number;
}

export interface GamePopupViewModel {
    readonly baseInfo: Property<BaseInfoGame>;
    readonly setBaseInfo: (chenge: Partial<BaseInfoGame>) => void;
    readonly characteristics: Property<Array<Attributes>>;
    readonly characteristicsOnChange: (data: Attributes) => void;
    readonly addNewCharacteristics: () => void;
}

export interface NewGamePopupViewModel {
    (initData: Game): ValueWithEffect<GamePopupViewModel>;
}
export const newGamePopupViewModel: NewGamePopupViewModel = (initData) => {
    const baseInfo = newLensedAtom<BaseInfoGame>(initData);
    const characteristics = newLensedAtom<Game['attributes']>([]);

    const characteristicsOnChange = (el: {
        id: number;
        name: string;
        value: string;
        isMain: boolean;
        localeState?: 'new' | 'deleted';
    }) =>
        characteristics.modify((characteristics) => {
            const rest = characteristics.filter((ch) => ch.id !== el.id);
            return [...rest, el].sort((a, b) => a.id - b.id);
        });

    const addNewCharacteristics = () =>
        characteristics.modify((e) => [
            ...e,
            {
                id:
                    e.length > 0
                        ? Math.max(...e.map((d) => d.id)) + 1
                        : initData.attributes.length > 0
                          ? Math.max(...initData.attributes.map((d) => d.id)) +
                            1
                          : 1,
                name: '',
                value: '',
                isMain: false,
                localeState: 'new',
            },
        ]);
    return valueWithEffect.new({
        baseInfo,
        setBaseInfo: (chenge) =>
            baseInfo.modify((info) => ({ ...info, ...chenge })),
        characteristics,
        characteristicsOnChange,
        addNewCharacteristics,
    });
};
