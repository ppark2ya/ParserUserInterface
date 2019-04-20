import React from 'react';
import styles from './LoginInput.scss';
import classNames from 'classnames/bind';
import LoginModal from './LoginModal';
const cx = classNames.bind(styles);

const LoginInput = ({ onKeyPress, onChange, toggleOpen }) => {
    return (
        <div className={cx('row')}>
            <label className={cx('styled-label')}>ID</label>
            <input className={cx('styled-input')} type="text" name="id" placeholder="아이디" onChange={onChange}/>
            <label className={cx('styled-label')}>Password</label>
            <input className={cx('styled-input')} type="password" name="pw" placeholder="비밀번호" onKeyPress={onKeyPress} onChange={onChange}/>
            <span className={cx('sign-up')}>
                <LoginModal
                    title={'SIGN UP FORM'}
                    toggleOpen={toggleOpen}>
                    회원가입
                </LoginModal>
            </span>
        </div>
    );
};

export default LoginInput;