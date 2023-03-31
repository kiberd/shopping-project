import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { Product } from "data";
import styled from "@emotion/styled";

const StyledProductListWrapper = styled("div")`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

interface ProductListProps {
  currentItems: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ currentItems }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [currentItems]);

  return (
    <StyledProductListWrapper>
      {currentItems &&
        currentItems.map((item: Product) => (
          <ProductItem key={item.item_no} item={item} />
        ))}
    </StyledProductListWrapper>
  );
};

export default ProductList;
