import { ObjectWithId } from '../../../../components/table/table.component';

export interface GamesAPI {
    id: number;
    title: string;
    price: number;
    is_deleted: boolean;
    is_bonus_game: boolean;
}

export interface Games extends ObjectWithId {
    id: number;
    title: string;
    price: number;
    isSeleted: boolean;
    isBonusGame: boolean;
}

export const mapGames = (game: GamesAPI): Games => ({
    ...game,
    isSeleted: game.is_deleted,
    isBonusGame: game.is_bonus_game,
});

export interface GameAPI {
    title: string;
    description: string;
    price: number;
    id: number;
    sales_count: number;
    images: Array<{
        id: number;
        game_id: number;
        link: string;
        priority: number;
    }>;
    attributes: Array<{
        id: 0;
        name: string;
        value: string;
        is_main: false;
    }>;
}

export interface Game {
    title: string;
    description: string;
    price: number;
    id: number;
    salesCount: number;
    images: Array<{
        id: number;
        gameId: number;
        link: string;
        priority: number;
    }>;
    attributes: Array<{
        id: 0;
        name: string;
        value: string;
        isMain: false;
    }>;
}

export const mapGame = (game: GameAPI): Game => ({
    ...game,
    salesCount: game.sales_count,
    images: game.images.map((image) => ({ ...image, gameId: image.game_id })),
    attributes: game.attributes.map((attribute) => ({
        ...attribute,
        isMain: attribute.is_main,
    })),
});

export const emptyGame = (): Game => ({
    title: '-',
    description: '-',
    price: 0,
    id: 0,
    salesCount: 0,
    images: [],
    attributes: [],
});
