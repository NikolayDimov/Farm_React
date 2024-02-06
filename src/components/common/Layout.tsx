import { ReactNode } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Noto Sans', sans-serif;
    display: block;
    /* height: 100%; */
    margin: 0;
    /* overflow: hidden; */
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
