import React, { Component, Fragment } from "react";
import { getZabbixGraph } from "../../../lib/api";
import { Bar } from "react-chartjs-2";

class Zabbix extends Component {
  state = {
    chartData: {}
  };
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
      const response = await getZabbixGraph({ uid, auth });
      const { result, chartData, message, status_nm } = response.data;

      if (chartData == null || chartData.length == 0) {
        chartData[0] = { status_nm: "noData", count: 0 };
      }
      this.data = {
        labels: ["데이터가 존재하지 않습니다"],
        datasets: [
          {
            label: "최근 일주일 발생 빈도 ",
            backgroundColor: "rgb(0,138,230)",
            borderColor: "rgb(0,138,230)",
            borderWidth: 1,
            hoverBackgroundColor: "rgb(0,138,230)",
            hoverBorderColor: "rgb(0,138,230)",
            data: [5]
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
      <div style={{ width: "70%", height: "80%", margin: " auto" }}>
        <Bar data={this.data} options={this.option} />
      </div>
    );
  }
}

export default Zabbix;
