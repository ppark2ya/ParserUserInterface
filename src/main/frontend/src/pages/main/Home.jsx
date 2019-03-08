import React, { Component, Fragment } from 'react';
import { Title, Dashboard } from '../../components/Main/Home/';
import PropTypes from 'prop-types';
import { getHomeDashboard } from '../../lib/api';

class Home extends Component {
    static defaultProps = {

    }

    static propTypes = {
        // id: PropTypes.string.isRequired,
    }

    state = {

    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        let response = await getHomeDashboard({uid, auth});
        console.info(response);
    }

    render() {
        return (
            <Fragment>
                <Title/>
                <Dashboard/>
            </Fragment>
        );
    }
}

export default Home;