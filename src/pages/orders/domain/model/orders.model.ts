import { ObjectWithId } from '../../../../components/table/table.component';

export interface Orders extends ObjectWithId {
    id: number;
    startDate: Date;
    endDate: Date;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    isPayed: boolean;
    isRefunded: boolean;
    isCanceled: boolean;
    legalId: string;
    hasManager: boolean;
    managersCount: number;
    totalPrice: number;
    hasBonusGame: boolean;
}

export interface OrdersAPI {
    id: number;
    start_date: string;
    end_date: string;
    client_name: string;
    client_phone: string;
    client_email: string;
    is_payed: boolean;
    is_refunded: boolean;
    is_canceled: boolean;
    legal_id: string;
    has_manager: boolean;
    managers_count: number;
    total_price: number;
    has_bonus_game: boolean;
    prepayment_done: boolean;
}

export const mapOrders = (data: OrdersAPI): Orders => ({
    id: data.id,
    clientName: data.client_name,
    clientPhone: data.client_phone,
    clientEmail: data.client_email,
    startDate: new Date(data.start_date),
    isPayed: data.is_payed || data.prepayment_done,
    isCanceled: data.is_canceled,
    totalPrice: data.total_price,
    endDate: new Date(data.end_date),
    legalId: data.legal_id,
    isRefunded: data.is_refunded,
    hasManager: data.has_manager,
    managersCount: data.managers_count,
    hasBonusGame: data.has_bonus_game,
});

interface Image {
    id: number;
    gameId: number;
    link: string;
    priority: number;
}

interface Images extends Array<Image> {}

interface Game {
    id: number;
    title: string;
    images: Images;
}

export interface ProductCard {
    game: Game;
    gamePriceBefore: number;
    gamePriceAfter: number;
}

export interface OrderAPI {
    id: number;
    start_date: string;
    end_date: string;
    client_name: string;
    client_phone: string;
    client_email: string;
    is_payed: boolean;
    prepayment_done: boolean;
    is_refunded: boolean;
    is_canceled: boolean;
    legal_id: string;
    has_manager: boolean;
    managers_count: number;
    total_price: number;
    has_bonus_game: boolean;
    bonus_game: Game;
    games: Array<{
        game: Game;
        game_price_before: number;
        game_price_after: number;
    }>;
}
export interface Order extends ObjectWithId {
    id: number;
    startDate: Date;
    endDate: Date;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    isPayed: boolean;
    isRefunded: boolean;
    isCanceled: boolean;
    legalId: string;
    hasManager: boolean;
    managersCount: number;
    totalPrice: number;
    hasBonusGame: boolean;
    bonusGame: Game;
    games: Array<ProductCard>;
}
export const mapOrder = (data: OrderAPI): Order => ({
    id: data.id,
    startDate: new Date(data.start_date),
    endDate: new Date(data.end_date),
    clientName: data.client_name,
    clientPhone: data.client_phone,
    clientEmail: data.client_email,
    isPayed: data.is_payed || data.prepayment_done,
    isRefunded: data.is_refunded,
    isCanceled: data.is_canceled,
    legalId: data.legal_id,
    hasManager: data.has_manager,
    managersCount: data.managers_count,
    totalPrice: data.total_price,
    hasBonusGame: data.has_bonus_game,
    bonusGame: data.bonus_game,
    games: data.games.map((game) => ({
        game: game.game,
        gamePriceBefore: game.game_price_before,
        gamePriceAfter: game.game_price_after,
    })),
});

export const emptyOrder = (): Order => ({
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    clientName: '-',
    clientPhone: '-',
    clientEmail: '-',
    isPayed: false,
    isRefunded: false,
    isCanceled: false,
    legalId: '-',
    hasManager: false,
    managersCount: 0,
    totalPrice: 0,
    hasBonusGame: false,
    games: [],
    bonusGame: {
        id: 0,
        title: '-',
        images: [],
    },
});

export type OrderAction =
    | 'send a massage'
    | 'remove'
    | 'change bonus'
    | 'prepaid'
    | 'show massage'
    | { kind: 'canel the order'; id: number };


export const getOrderPopupTitle = (action: OrderAction | null) => {
    switch (action) {
        case 'send a massage':
            return 'Отправить сообщение?';
        case 'remove':
            return 'Изменить адрес?';
        case 'change bonus':
            return 'Изменить бонус?';
        case 'prepaid':
            return 'Установить статус "Предоплачен?"';
        case 'show massage':
            return 'Заказ удален';
        default:
            switch (action?.kind) {
                case 'canel the order':
                    return `Отменить заказ ${action.id}?`;
                default:
                    return '';
            }
    }
};
