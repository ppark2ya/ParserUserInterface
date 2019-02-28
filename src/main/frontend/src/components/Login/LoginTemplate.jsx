import React from 'react';
import styled from 'styled-components';
import LoginBox from './LoginBox';

const Wrapper = styled.section`
    background-image: url(https://cdn.ppomppu.co.kr/zboard/data3/2018/0903/20180903000708_lphnknbp.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 936px;
`;

const Container = styled.div`
    padding: 2em;
`;

const MainTitle = styled.span`
    margin-top: 120px;
    color: #fff;
    font-size: 8rem;
    display: inline-block;
`;

const Row = styled.div`
    display: block;
    width: 100%;
`;

const Footer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
`;

const Alert = styled.span`
    color: #fff;
    font-size: 1rem;
`;

const LoginTemplate = ({ onKeyPress, onClick, onChange }) => {
    return (
        <Wrapper>
            <Container>
                <MainTitle>Message Priority</MainTitle>
                <LoginBox onKeyPress={onKeyPress} onClick={onClick} onChange={onChange}></LoginBox>
            </Container>
            <Footer>
                <Row>
                    <Alert>이 시스템은 권한이 허락된 사용자만이 접근할 수 있습니다.</Alert>
                </Row>
            </Footer>
        </Wrapper>
    );
};

export default LoginTemplate;