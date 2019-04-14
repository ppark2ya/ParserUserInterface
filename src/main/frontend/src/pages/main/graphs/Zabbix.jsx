import React, { Component, Fragment } from "react";
import { getZabbixGraph } from "../../../lib/api";
import { Bar } from "react-chartjs-2";
import produce from "immer";

class Zabbix extends Component {
  state = {
    chartData: {},
    datasets: {}
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
      const lableDay = [];
      const data = [];
      const datasets = [];
      const color = [
        "rgb(255, 0, 0)",
        "rgb(255, 234, 0)",
        "rgb(16, 200, 250)",
        "rgb(16, 173, 140)",
        "rgb(64, 54, 140)",
        "rgb(20, 145, 140)",
        "rgb(203, 210, 2)"
      ];
      if (result === "SUCCESS") {
        if (status_nm.length > 0) {
          var cnt = 0;
          for (var i = 0; i < status_nm.length; i++) {
            console.log(status_nm[i]);
            let labeldate = [];
            for (var x = 0; x < 7; x++) {
              labeldate[x] = chartData[cnt].count;
              cnt++;
            }
            data[i] = labeldate;
            datasets[i] = {
              label: status_nm[i].STATUS_NM,
              backgroundColor: color[i].toString(),
              borderColor: color[i].toString(),
              borderWidth: 1,
              hoverBackgroundColor: color[i].toString(),
              hoverBorderColor: color[i].toString(),
              data: data[i]
            };
          }

          for (var i = 0; i < 7; i++) {
            lableDay[i] = chartData[i].day;
          }
          this.data = {
            labels: lableDay,
            datasets: datasets
          };
        } else {
          this.data = {
            labels: ["데이터 없음"],
            datasets: [
              {
                label: "일 별 발생 빈도",
                backgroundColor: "rgb(0,138,230)",
                borderColor: "rgb(0,138,230)",
                borderWidth: 1,
                hoverBackgroundColor: "rgb(0,138,230)",
                hoverBorderColor: "rgb(0,138,230)",
                data: ["0"]
              }
            ]
          };
        }
        this.setState(
          produce(draft => {
            draft.datasets = datasets;
            draft.data = data;
          })
        );
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
