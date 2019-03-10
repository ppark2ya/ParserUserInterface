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
            const { result, chartData, message } = response.data;
    
            if(result === "SUCCESS") {
                this.setState({
                    chartData: [...chartData]
                })
            } else {
                console.error(response);
                alert(message);
            }
        } catch(e) {
            console.error(e);
            alert("관리자에게 문의하세요!");
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