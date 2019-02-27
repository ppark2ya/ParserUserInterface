import React from 'react';
import styled from 'styled-components';
import LoginInput from '../LoginInput';
import LoginButton from '../LoginButton';

const Wrapper = styled.div`
    background-color: rgba(255,255,255,0.5);
    padding: 2rem 1rem;
    margin-top: 4rem;
    width: 40%;
`;

const Area = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
`;

const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`;

const LoginBox = ({ onKeyPress, onClick }) => {
    return (
        <Wrapper>
            <Area>
                <FlexCol>
                    <LoginInput onKeyPress={onKeyPress}/>
                </FlexCol>
                <LoginButton onClick={onClick}/>
            </Area>
        </Wrapper>
    );
};

export default LoginBox;