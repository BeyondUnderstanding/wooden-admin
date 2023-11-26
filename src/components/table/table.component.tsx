import { Link } from 'react-router-dom';
import { Button } from '../button/button.component';
import css from './table.module.css';
import { constVoid } from 'fp-ts/lib/function';
import { DateFromISOString } from 'io-ts-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ObjectWithId {
    id: string | number;
    [key: string]: unknown;
}

export interface TableProps {
    readonly headers: ReadonlyArray<string>;
    readonly cells: ReadonlyArray<ObjectWithId>;
}

export const Table = ({ headers, cells }: TableProps) => {
    return (
        <table className={css.table}>
            <thead className={css.head}>
                <tr className={css.row}>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {cells.map((row, i) => (
                    <tr className={css.row} key={`${row.id}`}>
                        {Object.values(row)
                            .slice(0, headers.length)
                            .map((cell) => (
                                <td
                                    className={css.cell}
                                    key={`${cell}-${uuidv4()}`}
                                >
                                    {DateFromISOString.is(cell)
                                        ? cell.toLocaleDateString()
                                        : `${cell}`}
                                </td>
                            ))}
                        <td className={css.cell}>
                            <Link to={`/order/${row.id}`}>
                                <Button
                                    label={'Открыть'}
                                    onClick={constVoid}
                                    disabled={false}
                                    type={'def'}
                                />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
