import { Product } from "data";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductList from "./ProductList";
import styled from "@emotion/styled";
import { ArrowLeft, ArrowRight } from "emotion-icons/bootstrap";

interface PaginatedProductsProps {
  data: Product[];
}

const PagenationWrapper = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;

  li {
    margin: 0 0.5rem 0 0.5rem;
  }
  li a {
    border-radius: 7px;
    padding: 0.1rem 0.5rem;
    cursor: pointer;
    height: 100%;
    vertical-align: middle;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }

  li.active a {
    border-color: transparent;
    font-weight: 900;
  }
  li.disabled a {
    visibility: hidden;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const PaginatedProducts: React.FC<PaginatedProductsProps> = ({ data }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 4;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / 4);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 4) % data?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ProductList currentItems={currentItems} />
      <PagenationWrapper>
        <StyledPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          initialPage={0}
          previousLabel={<ArrowLeft size="20" />}
          nextLabel={<ArrowRight size="20" />}
          activeClassName="active"
        />
      </PagenationWrapper>
    </>
  );
};

export default PaginatedProducts;
