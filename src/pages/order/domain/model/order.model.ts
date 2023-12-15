interface Game {
    id: number;
    title: string;
}
export interface OrderInterface {
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
    game: [game: Game, game_price_before: number, game_price_after: number];
}
