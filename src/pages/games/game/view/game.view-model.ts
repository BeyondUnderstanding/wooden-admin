import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../../utils/run-view-model.utils';
import { GamesService } from '../../domain/service/game.service';
import { newLensedAtom } from '@frp-ts/lens';
import { Attributes, Game, GameAction } from '../../domain/model/game.model';
import { createAdapter } from '@most/adapter';
import { flow, pipe } from 'fp-ts/lib/function';
import { chain, combineArray, tap } from '@most/core';
import { Property } from '@frp-ts/core';
import { either } from 'fp-ts';

export interface NewImg {
    img: File;
    priority: number;
    id?: number;
}

export interface GameViewModel {
    readonly popupIsOpen: Property<boolean>;
    readonly onCancel: () => void;
    readonly onOpenByAction: (action: GameAction | null) => void;
    readonly activeAction: Property<GameAction | null>;
    readonly onChangeGame: (data: Partial<Game>) => void;
    readonly game: Property<Game>;
    readonly onSave: () => void;
    readonly onDeliteAttribute: (id: number) => void;
    readonly onChangeGameAttributes: (
        id: number,
        newData: Partial<Attributes>
    ) => void;
    readonly imgUpload: (event: Partial<NewImg>) => void;
    readonly imgUploadSave: () => void;
    readonly imgDelete: (id: number) => void;
    readonly imgUpdatePrioritySave: () => void;
}

export interface NewGameViewModel {
    (service: GamesService, initGame: Game): ValueWithEffect<GameViewModel>;
}
export const newGameViewModel: NewGameViewModel = (service, initGame) => {
    const game = newLensedAtom(initGame);
    const activeAction = newLensedAtom<GameAction | null>(null);
    const [onOpenByAction, onOpenByActionEvent] =
        createAdapter<GameAction | null>();

    const [onSave, onSaveEvent] = createAdapter<void>();

    const popupIsOpen = newLensedAtom(false);

    const img = newLensedAtom<NewImg>({} as NewImg);
    const [imgUploadSave, imgUploadEvent] = createAdapter<void>();

    const [imgUpdatePrioritySave, imgUpdatePrioritySaveEvent] =
        createAdapter<void>();

    const onDeliteAttribute = (id: number) => {
        game.modify((g) => ({
            ...g,
            attributes: g.attributes.map((a) =>
                a.id !== id ? a : { ...a, localeState: 'deleted' }
            ),
        }));
    };

    const onChangeGameAttributes = (
        id: number,
        newData: Partial<Attributes>
    ) => {
        game.modify((g) => {
            const newAttributes = g.attributes.map((attr) => {
                if (attr.id === id) {
                    return { ...attr, ...newData };
                }
                return attr;
            });
            return { ...g, attributes: newAttributes };
        });
    };

    const getChangedAttributes = () =>
        game.get().attributes.filter((el) => !initGame.attributes.includes(el));

    const [imgDelete, imgDeleteEvent] = createAdapter<number>();

    const saveEffect = pipe(
        onSaveEvent,
        chain(() =>
            combineArray(
                (...services) => [...services],
                [
                    service.updateMainKeys(game.get()),
                    service.createAttributes(
                        getChangedAttributes(),
                        game.get().id
                    ),
                    service.deleteAttributes(game.get().attributes),
                    service.updateAttributes(game.get().attributes),
                ]
            )
        ),
        tap(
            flow(
                either.sequenceArray,
                either.fold(
                    (_) => onOpenByAction('error'),
                    () => onOpenByAction(null)
                )
            )
        )
    );

    const actionChangeEvent = pipe(
        onOpenByActionEvent,
        tap((action) => {
            activeAction.set(action);
            popupIsOpen.set(!!action);
        })
    );

    const saveImgEffect = pipe(
        imgUploadEvent,
        chain((_) => service.upladFile(img.get(), game.get().id)),
        tap(
            flow(
                either.fold(
                    (_) => onOpenByAction('error'),
                    (x) => {
                        onOpenByAction(null);
                        game.modify((g) => ({
                            ...g,
                            images: [
                                ...g.images,
                                {
                                    id:
                                        Math.max(...g.images.map((x) => x.id)) +
                                        1,
                                    gameId: x.id,
                                    link: x.url,
                                    priority: img.get().priority,
                                },
                            ],
                        }));
                    }
                )
            )
        )
    );

    const deleteImgEffect = pipe(
        imgDeleteEvent,
        chain((id) => service.deleteFile(id)),
        tap(
            flow(
                either.fold(
                    (_) => onOpenByAction('error'),
                    (id) => {
                        game.modify((g) => ({
                            ...g,
                            images: g.images.filter((img) => img.id !== id),
                        }));
                        onOpenByAction(null);
                    }
                )
            )
        )
    );

    const imgUpdatePrioritySaveEffect = pipe(
        imgUpdatePrioritySaveEvent,
        chain((_) =>
            service.updateImgPriority(img.get().id ?? 0, img.get().priority)
        ),
        tap(
            flow(
                either.fold(
                    (_) => onOpenByAction('error'),
                    (data) => {
                        game.modify((g) => ({
                            ...g,
                            images: g.images.map((img) => {
                                if (img.id === data.id) {
                                    return { ...img, priority: data.priority };
                                }
                                return img;
                            }),
                        }));
                        onOpenByAction(null);
                    }
                )
            )
        )
    );

    return valueWithEffect.new(
        {
            game,
            onSave,
            imgDelete,
            popupIsOpen,
            activeAction,
            imgUploadSave,
            onOpenByAction,
            onDeliteAttribute,
            imgUpdatePrioritySave,
            onChangeGameAttributes,
            onCancel: () => onOpenByAction(null),
            imgUpload: (file) => img.modify((f) => ({ ...f, ...file })),
            onChangeGame: (data) => {
                game.modify((g) => {
                    if (data.attributes && data.attributes.length > 0) {
                        return {
                            ...g,
                            ...data,
                            attributes: [...g.attributes, ...data.attributes],
                        };
                    }
                    return { ...g, ...data };
                });
                onOpenByAction(null);
            },
        },
        actionChangeEvent,
        saveEffect,
        saveImgEffect,
        deleteImgEffect,
        imgUpdatePrioritySaveEffect
    );
};
