import { atom, selector } from "recoil";

import { Product } from "data";

type UserInfo = { cartList: Product[] };

export const userState = atom<UserInfo>({
  key: "userInfo",
  default: {
    cartList: [],
  },
});

export const cartListState = selector({
  key: "cartListSelector",
  get: ({ get }) => {
    return get(userState).cartList;
  },
  set: ({ set, get }, newValue: any) => {
    const newCartList = [...get(userState).cartList];
    const isExist = newCartList.some(
      (cart: Product) => cart.item_no === newValue.item_no
    );

    if (isExist) {
      const index = newCartList.findIndex(
        (cart: Product) => cart.item_no === newValue.item_no
      );
      newCartList.splice(index, 1);
    } else {
      if (newCartList.length === 3) {
        alert("장바구니에는 최대 3개까지만 담을 수 있습니다.");
      } else {
        newCartList.push(newValue);
      }
    }

    set(userState, (prevState) => ({
      ...prevState,
      cartList: newCartList,
    }));
  },
});
