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

// const LoginBox = styled.div`
//     background-color: rgba(255,255,255,0.5);
//     padding: 2rem 1rem;
//     margin-top: 4rem;
//     width: 40%;
// `;

// const Area = styled.div`
//     display: flex;
//     width: 100%;
//     height: 100px;
// `;

// const FlexCol = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 80%;
// `;

const Row = styled.div`
    display: block;
    width: 100%;
`;

// const Label = styled.label`
//     font-size: 1.5rem;
//     display: inline-block;
//     width: 20%;
//     text-align: right;
//     padding-right: 10px;
// `;

// const Input = styled.input.attrs({
//     type: 'text',
//     size: props => (props.small ? 5 : undefined),
// })`
//     border-radius: 3px;
//     margin: 0 0 1em;
//     padding: ${props => props.padding};
//     width: 70%;
//     ::placeholder {
//         font-size: 0.7rem;
//     }
// `;

// const Button = styled.button.attrs({
//     type: 'button',
// })`
//     height: 90%;
//     width: 10%;
//     background-color: #696969;
//     float: right;
//     color: #fff;
//     border: 0px solid transparent;
//     cursor: pointer;
// `;

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

const LoginTemplate = ({ onKeyPress, onClick }) => {
    return (
        <Wrapper>
            <Container>
                <MainTitle>Message Priority</MainTitle>
                <LoginBox onKeyPress={onKeyPress} onClick={onClick}></LoginBox>
                {/* <LoginBox>
                    <Area>
                        <FlexCol>
                            <Row>
                                <Label>ID</Label><Input padding="5px" placeholder="아이디"/>
                            </Row>
                            <Row>
                                <Label>Password</Label><Input padding="5px" placeholder="비밀번호"/>
                            </Row>
                        </FlexCol>
                        <Button>LOGIN</Button>
                    </Area>
                </LoginBox> */}
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