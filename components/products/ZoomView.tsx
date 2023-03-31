import styled from "@emotion/styled";

interface Position {
  left: number;
  top: number;
};

interface ViewProps {
  img: string;
  position: Position;
  isLeft: boolean;
}

const StyledView = styled("div")<{ img: string, position: Position, isLeft: boolean}>`
  z-index: 10;
  position: absolute;
  top: 0;
  left: ${({ isLeft }) => (isLeft ? 550 : -700)}px;
  width: 650px;
  height: 650px;
  background: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-position: ${({ position }) => position.left}px
    ${({ position }) => position.top}px;
  background-size: 200% 200%;
`;

const ZoomView = ({ img, position, isLeft }: ViewProps) => {
  return (
    <StyledView img={img} position={position} isLeft={isLeft} />
  );
};

export default ZoomView;
