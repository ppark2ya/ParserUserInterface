import React, { Component, Fragment } from 'react';
import { getCriticalServerList } from '../../../lib/api';
import { Bar } from 'react-chartjs-2';
import produce from 'immer';

class Synthesis extends Component {
    state = {
        chartData: {
            labels: [],
            datasets : []
        },
        options : {
            title : {
                display : true,
                text : '발생 빈도 수 ',
                fontSize : 40,
                fontStyle : 'normal'
            },
            legend : {
                display : true,
                position : 'bottom',
                labels : {
                    fontSize : 20,
                    boxWidth : 20,
                    padding : 20,
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
        try{
            const response = await getCriticalServerList();
            const { result, labels, chartData, message } = response.data;

            if(result === "SUCCESS") {

                this.setState(
                    produce(draft => {
                        draft.chartData.labels = labels;
                        draft.chartData.datasets = chartData;
                    })
                )
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
                <Bar data={chartData} width={300} height={100} options={options} />
            </div>
        );
    }
}

export default Synthesis;