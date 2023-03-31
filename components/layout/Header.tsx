"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "@emotion/styled";
import { Shopify } from "emotion-icons/simple-icons";

const StyledHeader = styled("header")`
  height: 8vh;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  padding: 0 30px;
  z-index: 10;
`;

const StyledNav = styled("nav")`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const StyledLogo = styled(Shopify)`
  color: white;
`;

const StyeldTab = styled("div")<{ selected: boolean }>`
  margin-left: 2rem;
  & > a {
    color: white;
    text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
  }
`;

const Header = () => {
  const pathname = usePathname();

  const isHome: boolean = pathname === "/";
  const isProducts: boolean = pathname === "/products";
  const isCarts: boolean = pathname === "/carts";

  return (
    <StyledHeader>
      <Link href="/products">
        <StyledLogo size="35" />
      </Link>
      <StyledNav>
        {/* <StyeldTab selected={isHome}>
          <Link href="/">Home</Link>
        </StyeldTab> */}
        <StyeldTab selected={isProducts}>
          <Link href="/products">Products</Link>
        </StyeldTab>
        <StyeldTab selected={isCarts}>
          <Link href="/carts">Carts</Link>
        </StyeldTab>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
