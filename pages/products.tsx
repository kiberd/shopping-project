import { Product } from "data";
import type { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import PageLayout from "../components/layout/PageLayout";
import { getProducts } from "../api/api";
import { useQuery } from "react-query";

import PaginatedProducts from "../components/products/PaginatedProducts";

interface Props {
  products: Product[];
}

const Products: NextPageWithLayout<Props> = ({ products }) => {
  const { data } = useQuery(["products"], getProducts, {
    initialData: products,
    refetchOnWindowFocus: false,
    select: (products) => products?.sort((a, b) => b.score - a.score)
  });
  return (
    data ? <PaginatedProducts data={data} /> : null
  )
};

export async function getStaticProps() {
  const data = await getProducts();

  return { props: { products: data } };
}

Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PageLayout>{page}</PageLayout>
    </BaseLayout>
  );
};

export default Products;
