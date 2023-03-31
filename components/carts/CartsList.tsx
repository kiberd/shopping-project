import React, { useState } from "react";
import CartsTable from "./CartsTable";
import CartsPanel from "./CartsPanel";
import { Product } from "data";

const Carts = () => {

  const [checkList, setCheckList] = useState<Product[]>([]);

  const handleCheckList = (list: Product[]) => {
    setCheckList(list);
  }

  return (
    <>
      <CartsTable onHandleCheckList={handleCheckList} />
      <CartsPanel checkList={checkList} />
    </>
  );
};

export default Carts;
