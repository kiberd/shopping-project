# 장바구니 시스템 구현하기

## 실행 환경 및 사용 라이브러리

- Node.js (v16)
- Typescript
- Next.js 
- Emotion
- Recoil
- React-query

***

## 실행 방법 (local)

```bash
npm i
npm run dev
```
http://localhost:3000

***

## Description

- Next.js 내부 api 이용해 mock-up server setting (getProducts, getCoupons)
```javascript
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { productItems } from '../../data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 res.status(200).send(JSON.stringify(productItems));
}
```

<br/>

- Nested layout 구성 (Base -> Each page)
```javascript
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
```

<br/>

- getStaticProps 메소드를 이용한 product data fetching
```javascript
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

```

<br/>

- reducer pattern 활용
```javascript
const calculator = {
  default: (checkList: Product[]) => {
    ....
    return totalValue;
  },
  amount: (checkList: Product[], discountAmount: any) => {
    ....
    return totalValue - discountAmount;
  },
  rate: (checkList: Product[], discountRate: any) => {
    ....
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
```


***
<br/>

## Preview

### 상품 목록 페이지 (/products)



- Grid 형식의 layout 구현을 위해 페이지 당 4개씩 노출하는 형식으로 변경

<img width="1728" alt="스크린샷 2022-12-06 오전 10 18 06" src="https://user-images.githubusercontent.com/34852597/205786137-5d7040f0-ec80-4842-9033-eabde710bd16.png">
<img width="1728" alt="스크린샷 2022-12-06 오전 10 18 38" src="https://user-images.githubusercontent.com/34852597/205786320-18c55234-dfca-4c14-b90e-8fcf0d484b4f.png">

<br/><br/>

- 상품 확대하기 기능 추가

<img width="1728" alt="스크린샷 2022-12-06 오전 10 17 37" src="https://user-images.githubusercontent.com/34852597/205786367-98756d5b-93b7-4292-a463-dbe087fdfb85.png">
<img width="1728" alt="스크린샷 2022-12-06 오전 10 17 46" src="https://user-images.githubusercontent.com/34852597/205787313-f567d353-782d-442b-90af-7da19269cf1c.png">


<br/><br/>


### 장바구니 페이지 (/carts)

<img width="1728" alt="스크린샷 2022-12-06 오전 10 19 01" src="https://user-images.githubusercontent.com/34852597/205786435-d4a32ea7-d9ab-42d3-9067-aaca60d68116.png">


