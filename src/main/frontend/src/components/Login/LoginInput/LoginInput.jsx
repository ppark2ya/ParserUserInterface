import React from 'react';
import styles from './LoginInput.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const LoginInput = ({ onKeyPress }) => {
    return (
        <div className={cx('row')}>
            <label className={cx('styled-label')}>ID</label>
            <input className={cx('styled-input')} type="text" name="id" placeholder="아이디"/>
            <label className={cx('styled-label')}>Password</label>
            <input className={cx('styled-input')} type="password" name="password" placeholder="비밀번호" onKeyPress={onKeyPress}/>
        </div>
    );
};

export default LoginInput;