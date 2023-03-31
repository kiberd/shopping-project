import React, { useState, useEffect, useRef } from "react";
import { Product } from "data";
import styled from "@emotion/styled";
import { Cart, CartFill } from "emotion-icons/bootstrap";

import { cartListState } from "../../atoms/user";
import { useRecoilState } from "recoil";
import ReactTooltip from "react-tooltip";

import { useScrollYPosition } from "react-use-scroll-position";

import Scanner from "./Scanner";
import ZoomView from "./ZoomView";

const StyledProductWrapper = styled("div")`
  width: 100%;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImgWrapper = styled("div")`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const StyledDescriptionWrapper = styled("div")`
  margin-top: 20px;
  padding: 10px;
  width: 90%;
  border-top: 0.5px solid gray;
  & > p {
    font-size: 0.9rem;
    color: gray;
  }
`;

const StyledTitleWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > p {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
  }
`;

const StyledCart = styled(Cart)`
  cursor: pointer;
`;

const StyledCartFill = styled(CartFill)`
  cursor: pointer;
`;

interface ProductItemProps {
  item: Product;
}

interface Position {
  left: number;
  top: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageRect, setImageRect] = useState<any>();
  const [scannerPosition, setScannerPosition] = useState<Position | null>();
  const [viewPosition, setViewPosition] = useState<Position | null>();
  const [cartList, setCartList] = useRecoilState(cartListState);
  const scrollY = useScrollYPosition();

  const handleCartClick = () => {
    setCartList(item);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageRef && imageRef.current && imageRect) {
      const imageWidth = imageRef.current.width;
      const imageHeight = imageRef.current.height;

      const scannerPosLeft = e.clientX - 250 / 2 - imageRect.x;
      const scannerPosTop = e.clientY - 250 / 2 - imageRect.y + scrollY;

      const allowedPosLeft =
        scannerPosLeft >= 0 && scannerPosLeft <= imageWidth - 250;
      const allowedPosTop =
        scannerPosTop >= 0 && scannerPosTop <= imageHeight - 250;

      const scannerPosition = {
        left: 0,
        top: 0,
      };

      if (allowedPosLeft) {
        scannerPosition.left = scannerPosLeft;
      } else {
        if (scannerPosLeft < 0) {
          scannerPosition.left = 0;
        } else {
          scannerPosition.left = imageWidth - 250;
        }
      }

      if (allowedPosTop) {
        scannerPosition.top = scannerPosTop;
      } else {
        if (scannerPosTop < 0) {
          scannerPosition.top = 0;
        } else {
          scannerPosition.top = imageHeight - 250;
        }
      }
      setScannerPosition(scannerPosition);
      setViewPosition({
        left: scannerPosition.left * -2,
        top: scannerPosition.top * -2,
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRect) {
      setScannerPosition(null);
      setViewPosition(null);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        imageRef &&
        imageRef.current &&
        imageRef.current.getBoundingClientRect()
      ) {
        const width = imageRef.current.getBoundingClientRect().width;
        const height = imageRef.current.getBoundingClientRect().height;

        let x = imageRef.current.getBoundingClientRect().x;
        let y = imageRef.current.getBoundingClientRect().y;

        if (width !== 0 && height !== 0) {
          setImageRect({
            x: x,
            y: y,
          });
        }
      }
    }, 500);
  }, [imageRef]);

  return (
    <StyledProductWrapper>
      <StyledImgWrapper
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src={item.detail_image_url} ref={imageRef} />
        {scannerPosition && <Scanner position={scannerPosition} />}
        {imageRect && viewPosition && (
          <ZoomView
            position={viewPosition}
            img={item.detail_image_url}
            isLeft={imageRect.x < 500 ? true : false}
          />
        )}
      </StyledImgWrapper>

      <StyledDescriptionWrapper>
        <StyledTitleWrapper>
          <p data-for={"item_" + item.item_no} data-tip>
            {item.item_name}
          </p>
          <ReactTooltip
            id={"item_" + item.item_no}
            getContent={() => item.item_name}
            padding="20px"
          />

          {cartList.some((cart: Product) => cart.item_no === item.item_no) ? (
            <StyledCartFill size="20" onClick={handleCartClick} />
          ) : (
            <StyledCart size="20" onClick={handleCartClick} />
          )}
        </StyledTitleWrapper>
        <p>{item.price.toLocaleString()} 원</p>
      </StyledDescriptionWrapper>
    </StyledProductWrapper>
  );
};

export default ProductItem;
