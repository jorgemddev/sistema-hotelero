import { Users } from "./users";

export interface Charges {
    id?:number;
    created_at?:Date | string;
    detail?:string;
    ammount?:number;
    reservations_id?:number;
    users?:Users;
}