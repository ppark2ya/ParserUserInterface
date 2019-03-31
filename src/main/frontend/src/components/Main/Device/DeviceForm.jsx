import React, { PureComponent } from 'react';
import DeviceItem from './DeviceItem';
import styled from 'styled-components';

const StyledForm = styled.div`
    display: flex;
    width: 95%;
    margin: 0 auto;
`;

const formList = [
    { name: 'email', text: '이메일 주소' },
    { name: 'tel', text: '전화번호' }
];

class DeviceForm extends PureComponent {
    render() {
        const { handleChange, handleRemove, handleAdd, plainEmail, plainTel } = this.props;

        const deviceList = formList.map(
            (device, idx) => (
                <DeviceItem
                    key={idx}
                    name={device.name}
                    text={device.text}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                    handleAdd={handleAdd}
                    plainEmail={plainEmail}
                    plainTel={plainTel}
                />
            )
        );

        return (
            <StyledForm>
                {deviceList}
            </StyledForm>
        );
    }
}

export default DeviceForm;