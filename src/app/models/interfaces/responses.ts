import { Profile } from "./profile";

export interface Responses {
  status: string;
  codeHttp?:number;
  data: {} | [];
  token?:string;
  id?:string;
  msg: string;
  mistakes?: any;
  other?:any;
  level?:number;
  type_id?: any;
  hasStartedCash:boolean;
}
