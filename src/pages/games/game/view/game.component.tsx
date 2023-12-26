import { constVoid } from 'fp-ts/lib/function';
import { Button } from '../../../../components/button/button.component';
import css from './game.module.css';
import {
    Attributes,
    GameAction,
    Game as IGame,
} from '../../domain/model/game.model';
import { Popup } from '../../../../components/popup/popup';
import { Property } from '@frp-ts/core';
import { GamePopupBody } from './popup/popup.component';
import cn from 'classnames';
import { NewImg } from './game.view-model';

export interface GameProps {
    readonly game: IGame;
    readonly popupIsOpen: Property<boolean>;
    readonly onCancel: () => void;
    readonly onOpenByAction: (action: GameAction | null) => void;
    readonly activeAction: Property<GameAction | null>;
    readonly onChangeGame: (data: Partial<IGame>) => void;
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

export const Game = ({
    game,
    popupIsOpen,
    onCancel,
    onOpenByAction,
    activeAction,
    onChangeGame,
    onSave,
    onDeliteAttribute,
    onChangeGameAttributes,
    imgUpload,
    imgUploadSave,
    imgDelete,
    imgUpdatePrioritySave,
}: GameProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.titleWrap}>
                <div>
                    <h2 className={css.title}>{game.title}</h2>
                </div>
                <Button
                    label={'Архивировать'}
                    onClick={constVoid}
                    disabled={false}
                    size="medium"
                    type={'prime'}
                />
                <Button
                    label={'Изменить'}
                    onClick={() => onOpenByAction('title change')}
                    disabled={false}
                    size="medium"
                    type={'def'}
                />
                <Button
                    label={'Сохранить'}
                    onClick={() => onOpenByAction('save changes')}
                    disabled={false}
                    size="medium"
                    type={'def'}
                />
            </div>
            <div>
                <span className={cn(css.title, css['mb-2'])}>Цена за час</span>
                <h3>{game.price} ₾</h3>
            </div>
            <div>
                <span className={cn(css.title, css['mb-2'])}>Описание</span>
                <p className={css.description}>{game.description}</p>
            </div>
            <div className={css.imgWrap}>
                <div className={css.title}>
                    <span>Изображения</span>
                    <Button
                        label={'Добавить'}
                        onClick={() => onOpenByAction('upload file')}
                        disabled={false}
                        size="medium"
                        type={'def'}
                    />
                </div>
                <div className={css.imgsLine}>
                    {game.images.map((img) => (
                        <div className={css.imgsWrap} key={img.link}>
                            <img src={img.link} alt="" className={css.img} />
                            <div className={css.controls}>
                                <span>Приоритет: {img.priority}</span>
                                <Button
                                    label={'Удалить'}
                                    onClick={() => imgDelete(img.id)}
                                    disabled={false}
                                    size="medium"
                                    type={'prime'}
                                />
                                <Button
                                    label={'Приоритет'}
                                    onClick={() =>
                                        onOpenByAction({
                                            kind: 'change priority',
                                            imgId: img.id,
                                        })
                                    }
                                    disabled={false}
                                    size="medium"
                                    type={'def'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={css.characteristicsWrap}>
                <div className={css.characteristicsHeaderWrap}>
                    <span>Характеристики</span>
                    <Button
                        label={'Добавить'}
                        onClick={() => onOpenByAction('add characteristics')}
                        disabled={false}
                        size="medium"
                        type={'def'}
                    />
                </div>
                {game.attributes
                    .filter((attr) => attr.localeState !== 'deleted')
                    .map((attr) => (
                        <div className={css.characteristicsControllWrap}>
                            <input
                                type="text"
                                value={attr.name}
                                onChange={(e) =>
                                    onChangeGameAttributes(attr.id, {
                                        name: e.target.value,
                                    })
                                }
                                className={css.characteristicsInput}
                            />
                            <input
                                type="text"
                                value={attr.value}
                                onChange={(e) =>
                                    onChangeGameAttributes(attr.id, {
                                        value: e.target.value,
                                    })
                                }
                                className={css.characteristicsInput}
                            />
                            {!attr.isMain && (
                                <Button
                                    label={'Удалить'}
                                    onClick={() => onDeliteAttribute(attr.id)}
                                    disabled={false}
                                    size="medium"
                                    type={'prime'}
                                    theme={[css.characteristicsDelete]}
                                />
                            )}
                        </div>
                    ))}
            </div>
            <Popup title="TEST" isOpen={popupIsOpen}>
                <GamePopupBody
                    type={activeAction}
                    onChange={onChangeGame}
                    onCancel={onCancel}
                    onSave={onSave}
                    initData={game}
                    imgUpload={imgUpload}
                    imgUploadSave={imgUploadSave}
                    imgUpdatePrioritySave={imgUpdatePrioritySave}
                />
            </Popup>
        </div>
    );
};
