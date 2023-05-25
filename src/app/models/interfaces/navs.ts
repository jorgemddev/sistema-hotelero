export interface Navs { 
    id:number;   
    tag:string;
    path?:string;
    orderby?:string;
    type?:string;
    navs_id?:string;
    submenu?:Navs;
}
