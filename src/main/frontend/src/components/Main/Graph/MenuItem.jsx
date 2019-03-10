import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LeftMenu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class MenuItem extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.highlighted !== nextProps.highlighted;
    }

    render() {
        const { link, name, highlighted, onActive } = this.props;
        return (
            <div className={cx('nav-link', {highlighted})}>
                <Link to={link} onClick={onActive}>{name}</Link>
            </div>
        );
    }
}

export default MenuItem;