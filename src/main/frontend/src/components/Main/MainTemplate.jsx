import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 80%;
    height: 100%;
    margin: auto;
`;

const Main = styled.section`
    display: flex;
    height: 80%;
    background-color: #fff;
`;

const MainTemplate = ({ header, children }) => {
    return (
        <Container>
            {header}
            <Main>{children}</Main>
        </Container>
    );
};

export default MainTemplate;