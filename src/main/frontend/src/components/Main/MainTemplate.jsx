import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: auto;
`;

const Main = styled.section`
    display: flex;
    flex-direction: ${props => (props.column ? "column" : "row")}
    height: 80%;
    background-color: #fff;
    margin-top: 20px;
`;

const MainTemplate = ({ header, children, location: { pathname } }) => {
  return (
    <Container>
      {header}
      {pathname === "/main/home" || pathname === "/main/stats" ? (
        <Main column>{children}</Main>
      ) : (
        <Main>{children}</Main>
      )}
    </Container>
  );
};

export default withRouter(MainTemplate);
