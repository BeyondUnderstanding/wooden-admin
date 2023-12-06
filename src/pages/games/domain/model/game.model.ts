import { ObjectWithId } from '../../../../components/table/table.component';

export interface GameAPI {
    id: number;
    title: string;
    price: number;
    is_deleted: boolean;
    is_bonus_game: boolean;
}

export interface Game extends ObjectWithId {
    id: number;
    title: string;
    price: number;
    isSeleted: boolean;
    isBonusGame: boolean;
}

export const mapGame = (game: GameAPI): Game => ({
    ...game,
    isSeleted: game.is_deleted,
    isBonusGame: game.is_bonus_game,
});
