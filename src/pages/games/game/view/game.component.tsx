import { constVoid } from 'fp-ts/lib/function';
import { Button } from '../../../../components/button/button.component';
import css from './game.module.css';
import { GameAction, Game as IGame } from '../../domain/model/game.model';
import { Popup } from '../../../../components/popup/popup';
import { Property } from '@frp-ts/core';
import { GamePopupBody } from './popup/popup.component';

export interface GameProps extends IGame {
    readonly popupIsOpen: Property<boolean>;
    readonly onCancel: () => void;
    readonly onOpenByAction: (action: GameAction | null) => void;
    readonly activeAction: Property<GameAction | null>;
    readonly onChangeGame: (data: Partial<IGame>) => void;
}

export const Game = ({
    title,
    images,
    attributes,
    popupIsOpen,
    onCancel,
    onOpenByAction,
    activeAction,
    onChangeGame,
}: GameProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.titleWrap}>
                <h2 className={css.title}>{title}</h2>
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
            </div>
            <div className={css.imgWrap}>
                <div className={css.title}>
                    <span>Изображения</span>
                    <Button
                        label={'Добавить'}
                        onClick={constVoid}
                        disabled={false}
                        size="medium"
                        type={'def'}
                    />
                </div>
                <div className={css.imgsLine}>
                    {images.map((img) => (
                        <div className={css.imgsWrap}>
                            <img src={img.link} alt="" className={css.img} />
                            <div className={css.controls}>
                                <span>Приоритет: {img.priority}</span>
                                <Button
                                    label={'Удалить'}
                                    onClick={constVoid}
                                    disabled={false}
                                    size="medium"
                                    type={'prime'}
                                />
                                <Button
                                    label={'Приоритет'}
                                    onClick={constVoid}
                                    disabled={false}
                                    size="medium"
                                    type={'def'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={css.characteristicsWrap}>
                    <div className={css.characteristicsHeaderWrap}>
                        <span>Характеристики</span>
                        <Button
                            label={'Добавить'}
                            onClick={constVoid}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Сохранить'}
                            onClick={constVoid}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                    </div>
                    {attributes.map((attr) => (
                        <div className={css.characteristicsControllWrap}>
                            <span className={css.name}>{attr.name}</span>
                            <input
                                type="text"
                                value={attr.value}
                                className={css.characteristicsInput}
                            />
                            {!attr.isMain && (
                                <Button
                                    label={'Удалить'}
                                    onClick={constVoid}
                                    disabled={false}
                                    size="medium"
                                    type={'prime'}
                                    theme={[css.characteristicsDelete]}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Popup title="TEST" isOpen={popupIsOpen}>
                <GamePopupBody
                    type={activeAction}
                    onChange={onChangeGame}
                    onCancel={onCancel}
                    onComplite={constVoid}
                />
            </Popup>
        </div>
    );
};
