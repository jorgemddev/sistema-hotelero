import { ModulesDocument } from "./modules_document";

export interface TemplateDocuments{
    id?:number;
    tag?:string;
    number?:number;
    files_id?:number;
    created_at?:string;
    fhater?:number;
    fhater_document?:TemplateDocuments;
    modules_document?:ModulesDocument;
}