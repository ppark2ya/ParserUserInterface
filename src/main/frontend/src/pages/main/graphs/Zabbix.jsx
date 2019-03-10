import React, { Component, Fragment } from 'react';
import { getZabbixGraph } from '../../../lib/api';

class Zabbix extends Component {
    state = {
        chartData: {}
    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        try{
            const response = await getZabbixGraph({uid, auth});
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

export default Zabbix;