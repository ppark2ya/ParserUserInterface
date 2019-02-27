import React from 'react';
import styles from './LoginButton.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ onClick }) => {
    return (
        <button className={cx('login-button')} onClick={onClick}>LOGIN</button>
    );
};

export default Button;