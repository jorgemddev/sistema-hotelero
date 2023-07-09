import { Breadcrumb } from "ng-dynamic-breadcrumb/lib/breadcrumb.model";
import { Payment } from "./payment";
import { Users } from "./users";
import { Breakdown } from "../breakdown";

export interface CashMovements{
    id?:number;
    created_at?:string;
    ammount?:number;
    detail?:string;
    payment?:string;
    users?:Users;
    operation?:string;
    breakdown?:Breakdown;
    autorization?:string;
}