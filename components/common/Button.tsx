import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled("button")`
  display: inline-flex;
  padding: 5px 10px;
  align-items: center;
  border: 0.3px solid gray;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "" : "pointer")};;
`;

const Button = ({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) => {
  return <StyledButton disabled={disabled} onClick={onClick}>{children}</StyledButton>;
};

export default Button;
