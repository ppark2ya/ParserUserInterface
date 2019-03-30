import React from 'react';
import styles from './SettingForm.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SettingForm = ({ id, pw, name, tel, email, handleChange, handleClick }) => {
    return (
        <div className={cx('form-container')}>
            <div className={cx('form-control')}>
                <label>아이디</label>
                <input type="text" name="id" value={id} readOnly/>
            </div>
            <div className={cx('form-control')}>
                <label>패스워드</label>
                <input type="password" name="pw" id="pw" value={pw} onChange={handleChange} readOnly/>
                <button type="button" onClick={handleClick}>변경</button>
            </div>
            <div className={cx('form-control')}>
                <label>이름</label>
                <input type="text" name="name" value={name} readOnly/>
            </div>
            <div className={cx('form-control')}>
                <label>전화번호</label>
                <input type="text" name="tel" value={tel} readOnly/>
            </div>
            <div className={cx('form-control')}>
                <label>이메일 주소</label>
                <input type="email" name="email" value={email} readOnly/>
            </div>
        </div>
    );
};

export default SettingForm;