import React, { useState, useEffect } from "react";
import { cartListState } from "../../atoms/user";
import { useRecoilState } from "recoil";
import { Product } from "data";
import styled from "@emotion/styled";
import { PlusLg, Trash, Check, Exclamation } from "emotion-icons/bootstrap";
import { Minus } from "emotion-icons/boxicons-regular";
import Button from "../common/Button";

const StyledTable = styled("table")`
  table-layout: auto;
  min-width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border-radius: 10px;
  border-style: hidden;
  box-shadow: 0 0 0 0.5px #000;
  padding: 20px;
`;

const StyledHead = styled("thead")`
  border-bottom: 0.5px solid gray;
`;

const StyledHeadTr = styled("tr")`
  font-weight: 800;
  text-align: center;
  height: 50px;
`;

const StyledTd = styled("td")<{ info?: boolean; width?: string }>`
  padding: 3px;
  border-bottom: 0.5px solid gray;
  text-align: ${({ info }) => (info ? "" : "center")};
  width: ${({ width }) => width}; ;
`;

const StyledBodyTr = styled("tr")`
  height: 150px;
  width: 100%;
`;

const StyledImgContainer = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 50px;
  & > img {
    width: 100px;
  }
  & > span {
    margin: 0 20px;
    font-weight: 500;
  }
`;

const StyledButtonContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    margin: 0 10px;
  }
  & > span {
    width: 20px;
  }
`;

const NoDataContainer = styled("div")`
  min-width: 100%;
  min-height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CartsTableProps {
  onHandleCheckList: (list: Product[]) => void;
}

const CartsTable: React.FC<CartsTableProps> = ({ onHandleCheckList }) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const [tmpCartList, setTmpCartList] = useState<Product[]>([]);
  const [checkList, setCheckList] = useState<Product[]>([]);

  useEffect(() => {
    const tmpCartListArry: Product[] = [];
    cartList.map((item: Product) => {
      const newItem = { ...item };
      newItem.amount = 1;
      tmpCartListArry.push(newItem);
    });

    setTmpCartList(tmpCartListArry);
  }, [cartList]);

  const handleChangeCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckList = [...tmpCartList];
    if (e.target.checked) {
      setCheckList(newCheckList);
    } else {
      setCheckList([]);
    }
  };

  const handleChangeCheckEach = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Product
  ) => {
    if (e.target.checked) {
      const newCheckList = [...checkList];
      newCheckList.push(item);
      setCheckList(newCheckList);
    } else {
      setCheckList(
        checkList.filter(
          (checkItem: Product) => checkItem.item_no !== item.item_no
        )
      );
    }
  };

  const handleAmount = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product,
    sign: boolean
  ) => {
    // table에 있는 값 갱신
    const index = tmpCartList.findIndex((ele) => ele.item_no === item.item_no);

    const targetObj = { ...tmpCartList[index] };
    sign ? targetObj.amount++ : targetObj.amount--;

    const newTmpCartList = [...tmpCartList];
    newTmpCartList[index] = targetObj;

    // checkList에 있는 값 갱신
    const checkIndex = checkList.findIndex(
      (ele) => ele.item_no === item.item_no
    );
    const checkTargetObj = { ...checkList[checkIndex] };

    sign ? checkTargetObj.amount++ : checkTargetObj.amount--;

    const newCheckList = [...checkList];
    newCheckList[checkIndex] = checkTargetObj;

    setTmpCartList(newTmpCartList);
    setCheckList(newCheckList);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product
  ) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      setCartList(item);
      setCheckList([]);
    }
  };

  useEffect(() => {
    onHandleCheckList(checkList);
  }, [checkList]);

  return cartList.length === 0 ? (
    <NoDataContainer>장바구니가 비어있습니다.</NoDataContainer>
  ) : (
    <StyledTable>
      <StyledHead>
        <StyledHeadTr>
          <StyledTd></StyledTd>
          <StyledTd>
            <input
              type="checkbox"
              onChange={handleChangeCheckAll}
              checked={checkList.length === cartList.length}
            />
          </StyledTd>
          <StyledTd>상품명</StyledTd>
          <StyledTd>판매가</StyledTd>
          <StyledTd>수량</StyledTd>
          <StyledTd>쿠폰적용</StyledTd>
          <StyledTd></StyledTd>
        </StyledHeadTr>
      </StyledHead>

      <tbody>
        {tmpCartList.map((item: Product, index: any) => (
          <StyledBodyTr key={item.item_no}>
            <StyledTd></StyledTd>

            <StyledTd>
              <input
                type="checkbox"
                onChange={(e) => handleChangeCheckEach(e, item)}
                checked={checkList.some(
                  (checkItem) => checkItem.item_no === item.item_no
                )}
              />
            </StyledTd>

            <StyledTd info={true}>
              <StyledImgContainer>
                <img src={item.detail_image_url} />
                <span>{item.item_name}</span>
              </StyledImgContainer>
            </StyledTd>

            <StyledTd>{item.price.toLocaleString()}원</StyledTd>

            <StyledTd>
              <StyledButtonContainer>
                <Button
                  onClick={(e) => handleAmount(e, item, false)}
                  disabled={item.amount === 1 ? true : false}
                >
                  <Minus size="15" />
                </Button>
                <span>{item.amount}</span>
                <Button onClick={(e) => handleAmount(e, item, true)}>
                  <PlusLg size="15" />
                </Button>
              </StyledButtonContainer>
            </StyledTd>

            <StyledTd>
              {item.availableCoupon === false ? (
                <Exclamation size="30" color="red" />
              ) : (
                <Check size="30" color="green" />
              )}
            </StyledTd>

            <StyledTd>
              <Button onClick={(e) => handleDelete(e, item)}>삭제</Button>
            </StyledTd>
          </StyledBodyTr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default CartsTable;
