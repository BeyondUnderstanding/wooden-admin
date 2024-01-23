import { ObjectWithId } from '../../../../components/table/table.component';

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
}

export interface OrderAPI {
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

export const mapOrder = (data: OrderAPI): Order => ({
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
