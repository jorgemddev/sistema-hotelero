import { Amenities } from "./amenities";

export interface Rooms{
    id:number;
    room_number?:string;
    room_type?:string,
    capacity?:number;
    amenities?:any;
    price?:number;
    availability?:string;
    created_at?:string;
    update_in?:string;
}