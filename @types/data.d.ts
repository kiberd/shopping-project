declare module "data" {
  export interface Product {
    item_no: number;
    item_name: string;
    detail_image_url: string;
    price: number;
    score: number;
    availableCoupon?: boolean;
    amount: number;
  }

  export interface Coupon {
    type: string;
    title: string;
    discountRate?: number;
    discountAmount?: number;
  }
}
