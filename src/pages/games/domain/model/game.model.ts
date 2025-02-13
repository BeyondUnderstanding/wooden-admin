import { ObjectWithId } from '../../../../components/table/table.component';

export interface GamesAPI {
    id: number;
    title: string;
    price: number;
    is_deleted: boolean;
    is_bonus_game: boolean;
}

export interface Games extends ObjectWithId {
    title: string;
    price: number;
    isSeleted: boolean;
    isBonusGame: boolean;
}

export const mapGames = (game: GamesAPI): Games => ({
    id: game.id,
    title: game.title,
    price: game.price,
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

export interface Attributes {
    id: number;
    name: string;
    value: string;
    isMain: boolean;
    localeState?: 'new' | 'deleted';
}
interface Image {
    id: number;
    gameId: number;
    link: string;
    priority: number;
}

export interface Game {
    title: string;
    description: string;
    price: number;
    id: number;
    salesCount: number;
    images: Array<Image>;
    attributes: Array<Attributes>;
}

export const mapGame = (game: GameAPI): Game => ({
    ...game,
    salesCount: game.sales_count,
    images: game.images.map((image) => ({ ...image, gameId: image.game_id })),
    attributes: game.attributes
        .map((attribute) => ({
            ...attribute,
            isMain: attribute.is_main,
        }))
        .sort((a, b) => {
            if (a.is_main === b.is_main) {
                return 0;
            } else if (a.is_main) {
                return -1;
            } else {
                return 1;
            }
        }),
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

// action region
export type GameAction =
    | 'title change'
    | 'save changes'
    | 'error'
    | 'add characteristics'
    | 'archive'
    | 'upload file'
    | ChangePriority;

interface ChangePriority {
    kind: 'change priority';
    imgId: number;
}

export const getPopupTitle = (action: GameAction | null): string => {
    switch (action) {
        case 'title change':
            return 'Изменение основных характеристик';
        case 'save changes':
            return 'Сохранить изменения';
        case 'error':
            return 'Ууупс ошибка';
        case 'add characteristics':
            return 'Добавить характеристики';
        case 'upload file':
            return 'Загрузить фото';
        case 'archive':
            return 'Удалить игру?';
        default:
            switch (action?.kind) {
                case 'change priority':
                    return 'Изменить приоритет';
                default:
                    return 'Ууупс';
            }
    }
};
