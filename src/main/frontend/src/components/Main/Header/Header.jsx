import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import HeaderItem from './HeaderItem';
import PropTypes from 'prop-types';

class Header extends Component {
    static propTypes = {
        navList: PropTypes.array
    };

    state = {
        navList : [
            {idx: 0, link: "/main/home", name: "Home", highlighted: true},
            {idx: 1, link: "/main/graph", name: "Graph", highlighted: false},
            {idx: 2, link: "/main/stats", name: "Statistics", highlighted: false},
            {idx: 3, link: "/main/setting", name: "Setting", highlighted: false}
        ]
    };

    /**
     * 현재 보여지는 메뉴의 css값 변경
     * @param idx: 선택된 메뉴 인덱스
     * @param pathname: 메뉴 url 
     */
    activeMenu = (idx, pathname="") => {
        const { navList } = this.state;
        const toggledNavList = navList.map(nav => {
            if(nav.idx === idx || ~pathname.indexOf(nav.link)) {
                return {
                    ...nav,
                    highlighted: true
                }
            } else {
                return {
                    ...nav,
                    highlighted: false
                }
            }
        })

        this.setState({
            navList: [...toggledNavList]
        });
    }

    handleActive = (idx) => {
        this.activeMenu(idx);
    }

    componentDidMount() {
        const { location: {pathname}, history } = this.props;
        
        // 로그인 직후 /main 경로로 redirect되면 home component를 보여준다.
        if(pathname === '/main') {
            history.push('/main/home');
        } else { // 새로고침시에도 path따라 css를 바꿔준다.
            this.activeMenu(undefined, pathname);
        }
    }

    render() {
        const { handleActive, state: { navList }} = this;
        const NavLinks = navList.map(
            nav => (
                <HeaderItem
                    key={nav.idx}
                    link={nav.link}
                    name={nav.name}
                    highlighted={nav.highlighted}
                    onActive={() => handleActive(nav.idx)}
                />
            )
        )
        return (
            <nav className='header'>
                {NavLinks}
            </nav>
        );
    }
}

export default withRouter(Header);