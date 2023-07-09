export interface TemplateEmail{
    id?:number;
    tag?:string;
    subject?:string;
    template?:string;
    modules_id?:number;
    created_at?:Date | string;
}