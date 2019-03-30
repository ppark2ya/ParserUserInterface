import React from 'react';
import styles from './ServiceItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ServiceItem = ({ onChange, title, name, desc, checked }) => {
    return (
        <form className={cx('service-item')} name="serviceForm">
            <div className={cx('service-header')}>
                <span className={cx('service-title')}>{title}</span>
                <input 
                    className={cx('service-checkbox')} 
                    type="checkbox" 
                    name={name} 
                    id={name} 
                    value={name}
                    checked={checked? 'checked': ''} 
                    onChange={onChange}/>
                <label htmlFor={name}></label>
            </div>
            <div className={cx('service-content')}>
                <span className={cx('service-description')}>{desc}</span>
            </div>
        </form>
    );
};

export default ServiceItem;