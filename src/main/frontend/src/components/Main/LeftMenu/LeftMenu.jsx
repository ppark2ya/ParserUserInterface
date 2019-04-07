import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import MenuItem from './MenuItem';

class LeftMenu extends PureComponent {
    componentDidMount() {
        const { location: {pathname}, history } = this.props;
        
        // 로그인 직후 /main 경로로 redirect되면 home component를 보여준다.
        if(pathname === '/main/graph') {
            history.push('/main/graph/synthesis');
        } else if(pathname === '/main/setting') {
            history.push('/main/setting/myPage');
        } else { // 새로고침시에도 path따라 css를 바꿔준다.
            this.props.activeMenu(undefined, pathname);
        }
    }

    render() {
        const { handleActive, navList } = this.props;
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