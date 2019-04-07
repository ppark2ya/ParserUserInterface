import React, { Component } from "react";
import { getSefilCareGraph } from "../../../lib/api";
import { Bar } from "react-chartjs-2";
class SefilCare extends Component {
  state = {
    chartData: {}
  };
  chartData = chartData => {};
  data = {};

  option = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            fontSize: 20
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 20
          }
        }
      ]
    },
    title: {
      display: true,
      text: "최근 일주일 데이터",
      fontSize: 40,
      fontStyle: "normal"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontSize: 20,
        boxWidth: 20,
        padding: 20
      }
    }
  };

  componentDidMount = async () => {
    const { uid, auth } = sessionStorage;

    try {
      const response = await getSefilCareGraph({ uid, auth });
      const { result, chartData, message } = response.data;
      this.data = {
        labels: [
          chartData[0].day,
          chartData[1].day,
          chartData[2].day,
          chartData[3].day,
          chartData[4].day,
          chartData[5].day,
          chartData[6].day
        ],
        datasets: [
          {
            label: "일 별 발생 빈도",
            backgroundColor: "rgb(0,138,230)",
            borderColor: "rgb(0,138,230)",
            borderWidth: 1,
            hoverBackgroundColor: "rgb(0,138,230)",
            hoverBorderColor: "rgb(0,138,230)",
            data: [
              chartData[0].count,
              chartData[1].count,
              chartData[2].count,
              chartData[3].count,
              chartData[4].count,
              chartData[5].count,
              chartData[6].count
            ]
          }
        ]
      };
      if (result === "SUCCESS") {
        console.log(chartData);
        this.setState({
          chartData: { ...chartData }
        });
      } else {
        console.error(response);
        alert(message);
      }
    } catch (e) {
      console.error(e);
      alert("관리자에게 문의하세요!");
    }
  };

  render() {
    return (
      <>
        <div style={{ width: "70%", height: "80%", margin: " auto" }}>
          <Bar data={this.data} options={this.option} />
        </div>
      </>
    );
  }
}

export default SefilCare;
