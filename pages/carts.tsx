import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import PageLayout from "../components/layout/PageLayout";
import CartsList from "../components/carts/CartsList";

const Carts: NextPageWithLayout = () => {
  return <CartsList />;
};

Carts.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PageLayout>{page}</PageLayout>
    </BaseLayout>
  );
};

export default Carts;
