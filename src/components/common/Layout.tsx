import { ReactNode } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Noto Sans', sans-serif;
    display: block;
    margin: 0;
  }`;

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <>
        <GlobalStyles />
        {children}
    </>
);

export default Layout;
