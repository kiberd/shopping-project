import axios from "axios";
import { Product, Coupon } from "data";

export const getProducts = async () => {
  try {
    const { data } = await axios.get<Product[]>(
      process.env.NEXT_PUBLIC_ENDPOINT + `/getProducts`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoupons = async () => {
  try {
    const { data } = await axios.get<Coupon[]>(
      process.env.NEXT_PUBLIC_ENDPOINT + `/getCoupons`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
