import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import MenuItem from './MenuItem';

class LeftMenu extends Component {
    state = {
        navList : [
            {idx: 0, link: "/main/graph/synthesis", name: "Main", highlighted: true},
            {idx: 1, link: "/main/graph/checkserver", name: "Check Server", highlighted: false},
            {idx: 2, link: "/main/graph/sefilcare", name: "SefilCare", highlighted: false},
            {idx: 3, link: "/main/graph/zabbix", name: "Zabbix", highlighted: false}
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
        if(pathname === '/main/graph') {
            history.push('/main/graph/synthesis');
        } else { // 새로고침시에도 path따라 css를 바꿔준다.
            this.activeMenu(undefined, pathname);
        }
    }

    render() {
        const { handleActive, state: { navList }} = this;
        const NavLinks = navList.map(
            nav => (
                <MenuItem
                    key={nav.idx}
                    link={nav.link}
                    name={nav.name}
                    highlighted={nav.highlighted}
                    onActive={() => handleActive(nav.idx)}
                />
            )
        )
        return (
            <div className='leftMenu'>
                {NavLinks}
            </div>
        );
    }
}

export default withRouter(LeftMenu);