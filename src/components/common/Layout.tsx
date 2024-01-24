// Layout.js
import React, { ReactNode } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
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
