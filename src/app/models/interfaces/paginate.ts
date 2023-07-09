export interface Paginate {
  count:number;
  items: {};
  current: number;
  next:number;
  per_page:number;
  total:number;
  prev:boolean;
  other?:any;
}
