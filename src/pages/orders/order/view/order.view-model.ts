import { Property } from '@frp-ts/core';
import { Order } from '../../domain/model/orders.model';
import { ValueWithEffect } from '../../../../utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
// export interface NewOrderViewModel {
//     (initOrder: Order): ValueWithEffect<GameViewModel>;
// }

export const newOrderViewModel = () => {
    const order = newLensedAtom<ReadonlyArray<Order>>([]);
};
