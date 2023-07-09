import { Clients } from "./clients";
import { Rooms } from "./rooms";

export interface Reservations{
    id?:number;
    clients_id?:number;
    client?:Clients;
    rooms_id?:number;
    rooms?:Rooms;
    start?:string;
    end?:string;
    days?: string[],
    check_ing?:string;
    hour_ing?:string;
    check_out?:string;
    confirmed?:number;
    aditional?:number;
    price_aditional?:number;
    payment_id?:number;
    payment_ref?:string;
    abono?:number;
    reference?:string;
    created_at?:string;
    updated_at?:string;
    availability_id?:string;
    title?:string;
    color?:string;
    capacity?:number;
    room_type?:string;
}