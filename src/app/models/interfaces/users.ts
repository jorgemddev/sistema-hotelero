import { Privileges } from "./privileges";

export interface Users{
    id?:number;
    name?:string;
    lastname?:string;
    level?:number;
    privileges_id?:number;
    privileges?:Privileges;
    email:string;
    rut?:string;
    phone?:string;
    city?:string;
    created_at?:string;
    update_in?:string;
}