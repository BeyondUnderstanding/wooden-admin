import { Property } from '@frp-ts/core';
import { Attributes, Game, GameAction } from '../../../domain/model/game.model';
import { useProperty } from '@frp-ts/react';
import { Button } from '../../../../../components/button/button.component';
import css from './popup.module.css';
import { NewImg } from '../game.store';

interface BaseInfoGame {
    title: string;
    description: string;
    price: number;
}
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

    // @ts-ignore
    const handleFileChange = (event) => {
        const file: File | null = event.target.files[0];
        if (file) {
            imgUpload({ img: file });
        }
    };

    switch (action) {
        case 'title change':
            return (
                <>
                    <div>
                        <span>title</span>
                        <input
                            type="text"
                            onChange={(e) =>
                                setBaseInfo({ title: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <span>price</span>
                        <input
                            type="number"
                            onChange={(e) =>
                                setBaseInfo({ price: Number(e.target.value) })
                            }
                        />
                    </div>
                    <div>
                        <span>description</span>
                        <textarea
                            value={baseInfo.description}
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
                </>
            );
        case 'save changes':
            return (
                <>
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
                </>
            );
        case 'error':
            return (
                <>
                    <div> все пошло ПО *****</div>
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
                <>
                    {characteristics.map((el) => (
                        <div>
                            <div>
                                <input
                                    type="text"
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
                                    placeholder="Значение"
                                    value={el.value}
                                    onChange={(e) =>
                                        characteristicsOnChange({
                                            ...el,
                                            value: e.target.value,
                                        })
                                    }
                                />
                                <label>
                                    основной
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            characteristicsOnChange({
                                                ...el,
                                                isMain: e.target.checked,
                                            })
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                    <button onClick={addNewCharacteristics}>+</button>

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
                </>
            );
        case 'upload file':
            return (
                <>
                    <input type="file" onChange={handleFileChange} />
                    <input
                        type="number"
                        onChange={(e) =>
                            imgUpload({ priority: Number(e.target.value) })
                        }
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
                            onClick={imgUploadSave}
                            disabled={false}
                            size="medium"
                            type={'prime'}
                        />
                    </div>
                </>
            );
        default:
            switch (action?.kind) {
                case 'change priority':
                    return (
                        <>
                            <input
                                type="number"
                                onChange={(e) =>
                                    imgUpload({
                                        priority: Number(e.target.value),
                                    })
                                }
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
                        </>
                    );
                default:
                    return <span>Что то пошло не так</span>;
            }
    }
};
