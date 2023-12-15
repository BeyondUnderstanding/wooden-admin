import { Property } from '@frp-ts/core';
import { Game, GameAction } from '../../../domain/model/game.model';
import { useProperty } from '@frp-ts/react';
import { Button } from '../../../../../components/button/button.component';
import css from './popup.module.css';
import { useState } from 'react';

export interface GamePopupBodyProps {
    readonly type: Property<GameAction | null>;
    readonly onChange: (data: Partial<Game>) => void;
    readonly onCancel: () => void;
    readonly onComplite: () => void;
}

export const GamePopupBody = ({
    type,
    onChange,
    onCancel,
    onComplite,
}: GamePopupBodyProps) => {
    const action = useProperty(type);
    const [t, setT] = useState('');
    switch (action) {
        case 'title change':
            return (
                <>
                    <input type="text" onChange={(e) => setT(e.target.value)} />
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
                            onClick={() => onChange({ title: t })}
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
};
