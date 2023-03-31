import React from "react";
import styled from "@emotion/styled";

interface Position {
  left: number;
  top: number;
}

interface ScannerProps {
  position: Position;
}

const StyledScanner = styled("span")<{ position: Position }>`
  position: absolute;
  top: ${({ position }) => position.top}px;
  left: ${({ position }) => position.left}px;
  width: 250px;
  height: 250px;
  border: "1px solid #000";
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

const Scanner = ({ position }: ScannerProps) => {
  return <StyledScanner position={position} />;
};

export default Scanner;
