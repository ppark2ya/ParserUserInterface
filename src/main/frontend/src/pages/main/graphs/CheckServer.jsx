import React, { Component } from 'react';
import { getCheckServerGraph } from '../../../lib/api';
import { Pie } from 'react-chartjs-2';
import produce from 'immer';

class CheckServer extends Component {
    state = {
        chartData: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#008ae6',
                    '#cecece',
                    '#ffcc00',
                    '#ff6600',
                ],
                hoverBackgroundColor: [
                    '#008ae6',
                    '#cecece',
                    '#ffcc00',
                    '#ff6600',
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'HTTP Error',
                fontSize: 40,
                fontStyle: 'normal',
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontSize: 20,
                    boxWidth: 20,
                    padding: 20,
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 70,
                    bottom: 0
                }
            }
        }
    }

    componentDidMount = async () => {
        const { uid, auth } = sessionStorage;
        try{
            const response = await getCheckServerGraph({uid, auth});
            const { result, chartData, message } = response.data;
    
            if(result === "SUCCESS") {
                console.log(chartData);
                const [ labels, data ] = [ Object.keys(chartData), Object.values(chartData) ];
                
                this.setState(
                    produce(draft => {
                        draft.chartData.labels = labels;
                        draft.chartData.datasets[0].data = data;
                    })
                );
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
        const { chartData, options } = this.state;
        return (
            <div style={{width: "80%"}}>
                <Pie data={chartData} width={300} options={options}/>
            </div>
        );
    }
}

export default CheckServer;