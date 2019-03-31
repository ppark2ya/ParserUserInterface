import React from 'react';
import styles from './Device.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DeviceItem = ({ name, text, handleChange, handleRemove, handleAdd, plainEmail, plainTel }) => {
    return (
        <div className={cx('form-control')}>
            <div className={cx('form-header')}>
                <span className={cx('title')}>{text}</span>
            </div>
            <div className={cx('form-content')}>
                <div className={cx('content-area')}>
                    <span>{(name === 'email')? plainEmail : plainTel}</span>
                </div>
                <div className={cx('btn-area')}>
                    <button type="button" name={name} onClick={handleRemove}>삭제</button>
                </div>
            </div>
            <div className={cx('form-footer')}>
                <input type="text" name={name} onChange={handleChange}/>
                <button type="button" name={name} onClick={handleAdd}>추가</button>
            </div>
        </div>
    );
};

export default DeviceItem;