import { Clients } from "./clients";
import { Payment } from "./payment";
import { Reservations } from "./reservations";
import { Users } from "./users";

export interface Payments{
    id?:number;
    created_at?:string;
    ammount?:number;
    detail?:string;
    payment_id?:number;
    payment?:Payment;
    reservations_id?:number;
    reservations?:Reservations;
    client?:Clients;
    users?:Users;
    confirmed?:number | string;
}