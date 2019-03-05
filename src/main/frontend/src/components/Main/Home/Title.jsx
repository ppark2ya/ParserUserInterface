import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
`;

const Text = styled.span`
    border: 1px solid #000;
    height: 70px;
    line-height: 70px;
    width: 95%;
    text-align: center;
    font-size: 1.5rem;
`;

const Title = () => {
    const { uid, auth } = sessionStorage;
    return (
        <StyledTitle>
            <Text>{uid}님 환영합니다! 귀하의 권한은 Level{auth}입니다.</Text>
        </StyledTitle>
    );
};

export default Title;