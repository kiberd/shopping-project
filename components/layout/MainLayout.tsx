import styled from "@emotion/styled";

const StyledMain = styled("div")`
    width: 100%;
    min-height: 92vh;
    margin: 0 auto;
`

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledMain>{children}</StyledMain>;
}
