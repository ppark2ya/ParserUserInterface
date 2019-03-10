import React, { Component, Fragment } from 'react';
import { getSefilCareGraph } from '../../../lib/api';

class SefilCare extends Component {
    state = {
        chartData: {}
    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        try{
            const response = await getSefilCareGraph({uid, auth});
            const { result, chartData, message } = response.data;
    
            if(result === "SUCCESS") {
                console.log(chartData);
                this.setState({
                    chartData: {...chartData}
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
                
            </Fragment>
        );
    }
}

export default SefilCare;