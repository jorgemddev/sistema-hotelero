import { Amenities } from "./amenities";
import { Availability } from "./availability";

export interface Rooms{
    id:number;
    room_number?:string;
    room_type?:string,
    capacity?:number;
    amenities?:any;
    price?:number;
    availability?:Availability;
    availability_id?:number;
    created_at?:string;
    update_in?:string;
}