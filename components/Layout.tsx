import React from "react";
import Header from "./Header";
import Button from "../components/Button";
import styled from "styled-components";
import Name from "./Name";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <LayoutWrapper>
            <Header/>
            <Child>{children}
                <Wrapper>
                    <Name/>
                    <Button/>
                </Wrapper>

            </Child>

        </LayoutWrapper>
    );
}

const LayoutWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 375px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;
const Child = styled.div`
  height: 100%;
  margin-bottom: 72px;
  overflow: auto;
`;
const Wrapper = styled.div`position: absolute;
  width: 100%;
  padding: 0 16px;
  right: 0;
  bottom: 16px;`
