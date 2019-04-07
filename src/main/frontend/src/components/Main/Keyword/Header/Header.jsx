import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import HeaderItem from './HeaderItem';

class Header extends PureComponent {
    componentDidMount() {
        const { location: {pathname}, history } = this.props;
        
        // 로그인 직후 /main 경로로 redirect되면 home component를 보여준다.
        if(pathname === '/main/setting/keywordPage') {
            history.push('/main/setting/keywordPage/checkserver');
        } else { // 새로고침시에도 path따라 css를 바꿔준다.
            this.props.activeMenu(undefined, pathname);
        }
    }

    render() {
        const { handleActive, navList } = this.props;
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
            <div className='key-header'>
                {NavLinks}
            </div>
        );
    }
}

export default withRouter(Header);