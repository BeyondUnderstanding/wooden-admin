import { Property } from "@frp-ts/core";
import { ValueWithEffect, valueWithEffect } from "../../../../utils/run-view-model.utils";
import { OrdersService } from "../../domain/service/orders-rest.service";
import { newLensedAtom } from "@frp-ts/lens";
import { Order } from "../../domain/model/orders.model";


export interface OrderStore {
  readonly popupIsOpen: Property<boolean>;
  readonly popupTitle: Property<string>;
  readonly testOpenPopup : () => void;
  readonly id: Property<number>;
}
export interface NewOrderStore {
    (service:OrdersService, initOrder:Order): ValueWithEffect<OrderStore>;

}

export const newOrderStore:NewOrderStore = (service,initOrder) => {

    const popupIsOpen = newLensedAtom(false);
    const popupTitle = newLensedAtom<string>('');
    const id =  newLensedAtom<number>(initOrder.id);

     return valueWithEffect.new( {popupIsOpen,popupTitle,testOpenPopup:()=>popupIsOpen.set(true),id} ) // object , streams
};
