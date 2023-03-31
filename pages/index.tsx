import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import MainLayout from "../components/layout/MainLayout";

const Home: NextPageWithLayout = () => {
  return <div>Home</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <MainLayout>{page}</MainLayout>
    </BaseLayout>
  );
};

export default Home;
