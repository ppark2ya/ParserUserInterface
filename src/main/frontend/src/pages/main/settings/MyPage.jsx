import React, { Fragment, PureComponent } from 'react';
import { MypageContainers } from '../../../containers/MypageContainers';

class MyPage extends PureComponent {
    render() {
        return (
            <Fragment>
                <MypageContainers/>
            </Fragment>
        );
    }
}

export default MyPage;