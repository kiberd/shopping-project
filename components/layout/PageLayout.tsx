import styled from "@emotion/styled";

const StyledMain = styled("div")`
    width: 100%;
    height: 100%;
    min-height: 90vh;
    margin: 0 auto;
    max-width: 65vw;
`

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledMain>{children}</StyledMain>;
}
