export interface Products {
  id?: number;
  name: string;
  image?:string;
  amount?: number;
  sku?: string;
  serie?:string;
  barcode?:string;
  brand?: string;
  brand_id?:number;
  bmodel?: string;
  model?: string;
  model_id?: number;
  neto?: number;
  tax?: string;
  price?:number;
  obs?:string;
  providers_id?: string;
  created_at?:string;
}
