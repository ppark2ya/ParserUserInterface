import React from 'react';
import styles from './SettingButton.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SettingButton = ({ handleConfirm }) => {
    return (
        <div className={cx('btn-container')}>
            <button type="button" className={cx('btn-confirm')} onClick={handleConfirm}>확인</button>
        </div>
    );
};

export default SettingButton;