import { Product, Coupon } from "data";
import React, { useEffect, useReducer, useState } from "react";
import { getCoupons } from "../../api/api";
import { useQuery } from "react-query";
import styled from "@emotion/styled";

const StyledCouponContainer = styled("div")`
  border-top: 0.5px solid gray;
  margin-top: 20px;
  & > input {
    margin-left: 15px;
    margin-right: 10px;
  }
`;

const StyledPanelContainer = styled("div")`
  min-width: 100%;
  border: 0.5px solid gray;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
`;

const StyledPanel = styled("div")`
  display: flex;
  padding: 10px;
`;

const StyledPanelName = styled("div")`
  width: 30%;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPanelValue = styled("div")<{ highlight?: boolean }>`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ highlight }) => (highlight ? "red" : "black")};
  font-weight: ${({ highlight }) => (highlight ? 700 : 0)};
`;

interface CartsPanelProps {
  checkList: Product[];
}

interface Action {
  type: string;
  payload: {
    checkList: Product[];
    coupon?: Coupon;
  };
}

const calculator = {
  default: (checkList: Product[]) => {
    let totalValue = 0;
    checkList.forEach((item) => {
      totalValue += item.price * item.amount;
    });
    return totalValue;
  },
  amount: (checkList: Product[], discountAmount: any) => {
    let totalValue = 0;
    checkList.forEach((item) => {
      totalValue += item.price * item.amount;
    });
    return totalValue - discountAmount;
  },
  rate: (checkList: Product[], discountRate: any) => {
    let totalValue = 0;

    checkList.forEach((item) => {
      const total = item.price * item.amount;
      if (item.availableCoupon === false) {
        totalValue += total;
      } else {
        totalValue += total * (1 - discountRate / 100);
      }
    });

    return totalValue;
  },
};

const calculateReducer = (state: number, action: Action) => {
  switch (action.type) {
    case "amount":
      return calculator.amount(
        action.payload.checkList,
        action.payload.coupon?.discountAmount
      );
    case "rate":
      return calculator.rate(
        action.payload.checkList,
        action.payload.coupon?.discountRate
      );
    case "default":
      return calculator.default(action.payload.checkList);
    default:
      return state;
  }
};

const CartsPanel: React.FC<CartsPanelProps> = ({ checkList }) => {
  const { data: couponData } = useQuery(["coupons"], getCoupons, {
    refetchOnWindowFocus: false,
  });

  const [totalPrice, dispatch] = useReducer(calculateReducer, 0);
  const [coupon, setCoupon] = useState<Coupon>();

  useEffect(() => {
    if (coupon) {
      dispatch({
        type: coupon?.type,
        payload: { checkList: checkList, coupon: coupon },
      });
    } else {
      dispatch({ type: "default", payload: { checkList: checkList } });
    }
  }, [checkList, coupon]);

  const handleCouponChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item?: Coupon
  ) => {
    setCoupon(item);
  };

  return (
    <>
      <StyledCouponContainer>
        <h3>최종 결제 금액</h3>
        <input
          type={"radio"}
          name={"coupon"}
          value="default"
          onChange={handleCouponChange}
          defaultChecked={true}
          disabled={totalPrice === 0 ? true : false}
        />
        쿠폰 미적용
        {couponData?.map((item: Coupon) => (
          <>
            <input
              type={"radio"}
              name={"coupon"}
              value={item.type}
              onChange={(e) => handleCouponChange(e, item)}
              disabled={totalPrice === 0 ? true : false}
            />
            {item.title}
          </>
        ))}
      </StyledCouponContainer>

      <StyledPanelContainer>
        <StyledPanel>
          <StyledPanelName>총 금액</StyledPanelName>
          <StyledPanelValue>
            {calculator.default(checkList).toLocaleString()}원
          </StyledPanelValue>
        </StyledPanel>

        <StyledPanel>
          <StyledPanelName>할인 금액</StyledPanelName>
          <StyledPanelValue>
            -{(calculator.default(checkList) - totalPrice).toLocaleString()}원
          </StyledPanelValue>
        </StyledPanel>

        <StyledPanel>
          <StyledPanelName>최종 금액</StyledPanelName>
          <StyledPanelValue highlight={true}>
            {totalPrice.toLocaleString()}원
          </StyledPanelValue>
        </StyledPanel>
      </StyledPanelContainer>
    </>
  );
};

export default CartsPanel;
