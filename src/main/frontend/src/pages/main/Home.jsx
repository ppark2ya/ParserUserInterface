import React, { Component, Fragment } from 'react';
import { Title, Dashboard } from '../../components/Main/Home/';
import { getHomeDashboard } from '../../lib/api';

class Home extends Component {
    state = {
        chartData: []
    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        try{
            const response = await getHomeDashboard({uid, auth});
            const { result, chartData } = response.data;
    
            if(result === "SUCCESS") {
                this.setState({
                    chartData: [...chartData]
                })
            } else {
                console.error("서버에러");
            }
        } catch(e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Fragment>
                <Title/>
                <Dashboard chartData={this.state.chartData}/>
            </Fragment>
        );
    }
}

export default Home;