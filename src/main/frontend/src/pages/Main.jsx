import React from 'react';
import withCheckAuth from '../lib/withCheckAuth';

const Main = () => {
    return (
        <div>메인화면</div>
    );
};

export default withCheckAuth(Main);