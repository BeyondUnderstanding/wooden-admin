import { Property } from '@frp-ts/core';
import { Attributes, Game, GameAction } from '../../../domain/model/game.model';
import { useProperty } from '@frp-ts/react';
import { Button } from '../../../../../components/button/button.component';
import css from './popup.module.css';
import { NewImg } from '../game.store';
import { BaseInfoGame } from './popup.view-model';

export interface GamePopupBodyProps {
    readonly type: Property<GameAction | null>;
    readonly onChange: (data: Partial<Game>) => void;
    readonly onCancel: () => void;
    readonly onSave: () => void;
    readonly initData: Game;
    readonly imgUpload: (event: Partial<NewImg>) => void;
    readonly imgUploadSave: () => void;
    readonly imgUpdatePrioritySave: () => void;
    //vm
    readonly baseInfo: BaseInfoGame;
    readonly setBaseInfo: (chenge: Partial<BaseInfoGame>) => void;
    readonly characteristics: Array<Attributes>;
    readonly characteristicsOnChange: (data: Attributes) => void;
    readonly addNewCharacteristics: () => void;
}

export const GamePopupBody = ({
    type,
    onChange,
    onCancel,
    onSave,
    initData,
    imgUpload,
    imgUploadSave,
    imgUpdatePrioritySave,
    baseInfo,
    setBaseInfo,
    characteristics,
    characteristicsOnChange,
    addNewCharacteristics,
}: GamePopupBodyProps) => {
    const action = useProperty(type);

    // всрато файлы какого они типа?
    // @ts-ignore
    const handleFileChange = (event) => {
        const file: File | null = event.target.files[0];
        if (file) {
            imgUpload({ img: file });
        }
    };
    // @ts-ignore
    function dropHandler(ev) {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    imgUpload({ img: file });
                }
            });
        } else {
            return;
        }
    }
    // @ts-ignore
    function dragOverHandler(ev) {
        ev.preventDefault();
    }

    switch (action) {
        case 'title change':
            return (
                <div className={css.bodyWrap}>
                    <div className={css.inputWrap}>
                        <span>title</span>
                        <input
                            type="text"
                            value={baseInfo.title}
                            className={css.input}
                            onChange={(e) =>
                                setBaseInfo({ title: e.target.value })
                            }
                        />
                    </div>
                    <div className={css.inputWrap}>
                        <span>price</span>
                        <input
                            type="number"
                            className={css.input}
                            value={baseInfo.price}
                            onChange={(e) =>
                                setBaseInfo({ price: Number(e.target.value) })
                            }
                        />
                    </div>
                    <div className={css.inputWrap}>
                        <span>description</span>
                        <textarea
                            value={baseInfo.description}
                            className={css.textarea}
                            onChange={(e) =>
                                setBaseInfo({ description: e.target.value })
                            }
                        />
                    </div>
                    <div className={css.controls}>
                        <Button
                            label={'No'}
                            onClick={onCancel}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Yes'}
                            onClick={() => onChange({ ...baseInfo })}
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        case 'save changes':
            return (
                <div className={css.bodyWrap}>
                    <span className={css.alarmColor}>
                        Это необратимое действие.
                    </span>

                    <div className={css.controls}>
                        <Button
                            label={'No'}
                            onClick={onCancel}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Yes'}
                            onClick={onSave}
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        case 'error':
            return (
                <>
                    <div>Что то пошло не так</div>
                    <Button
                        label={'Ладно'}
                        onClick={onCancel}
                        disabled={false}
                        size="medium"
                        type={'def'}
                    />
                </>
            );
        case 'add characteristics':
            return (
                <div className={css.bodyWrap}>
                    {characteristics.map((el) => (
                        <div>
                            <div className={css.characteristicsWrap}>
                                <input
                                    type="text"
                                    className={css.input}
                                    placeholder="Имя"
                                    value={el.name}
                                    onChange={(e) =>
                                        characteristicsOnChange({
                                            ...el,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    className={css.input}
                                    placeholder="Значение"
                                    value={el.value}
                                    onChange={(e) =>
                                        characteristicsOnChange({
                                            ...el,
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        characteristicsOnChange({
                                            ...el,
                                            isMain: e.target.checked,
                                        })
                                    }
                                />
                                основной
                            </label>
                        </div>
                    ))}
                    {/* <button onClick={addNewCharacteristics}>+</button> */}
                    <Button
                        label={'+'}
                        onClick={addNewCharacteristics}
                        disabled={false}
                        size="medium"
                        type={'def'}
                    />

                    <div className={css.controls}>
                        <Button
                            label={'No'}
                            onClick={onCancel}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Yes'}
                            onClick={() =>
                                onChange({ attributes: characteristics })
                            }
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        case 'upload file':
            return (
                <div className={css.bodyWrap}>
                    <label
                        className={css.fileLabel}
                        onDragOver={dragOverHandler}
                        onDrop={dropHandler}
                    >
                        Выберете файл
                        <input
                            type="file"
                            size={5242880}
                            onChange={handleFileChange}
                            className={css.fileInput}
                        />
                    </label>
                    <div className={css.inputWrap}>
                        <span>Приоритет</span>
                        <input
                            type="number"
                            className={css.input}
                            onChange={(e) =>
                                imgUpload({ priority: Number(e.target.value) })
                            }
                        />
                    </div>
                    <div className={css.controls}>
                        <Button
                            label={'No'}
                            onClick={onCancel}
                            disabled={false}
                            size="medium"
                            type={'def'}
                        />
                        <Button
                            label={'Yes'}
                            onClick={imgUploadSave}
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </div>
            );
        default:
            switch (action?.kind) {
                case 'change priority':
                    return (
                        <div className={css.bodyWrap}>
                            <div className={css.inputWrap}>
                                <span>Приоритет</span>
                                <input
                                    type="number"
                                    className={css.input}
                                    onChange={(e) =>
                                        imgUpload({
                                            priority: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className={css.controls}>
                                <Button
                                    label={'No'}
                                    onClick={onCancel}
                                    disabled={false}
                                    size="medium"
                                    type={'def'}
                                />
                                <Button
                                    label={'Yes'}
                                    onClick={() => {
                                        imgUpload({
                                            id: action.imgId,
                                        });
                                        onCancel();
                                        imgUpdatePrioritySave();
                                    }}
                                    disabled={false}
                                    size="medium"
                                    type={'prime'}
                                />
                            </div>
                        </div>
                    );
                default:
                    return <span>Что то пошло не так</span>;
            }
    }
};
