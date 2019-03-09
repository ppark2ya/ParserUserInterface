import React from 'react';
import styled from 'styled-components';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart  } from 'recharts';

const ChartContainer = styled.div`
    width: 95%;
    height: 80%;
    margin: auto;
`;

const Dashboard = ({chartData}) => {
    return (
      <ChartContainer>
          <ResponsiveContainer width='100%' height='100%'>
              <ComposedChart 
                  data={chartData}
                  margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                  }}
              >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="week" tickMargin={10}/>
                  <YAxis axisLine={false} tickLine={false}/>
                  <Tooltip />
                  <Legend iconType="rect" height={100}/>
                  <Line type="linear" dataKey="data.ZABBIX" name="자빅스" stroke="#cecece" strokeWidth="7" activeDot={{ r: 5 }} animationDuration={0}/>
                  <Line type="linear" dataKey="data.POSTMAN" name="포스트맨" stroke="#ffcc00" strokeWidth="7" activeDot={{ r: 5 }} animationDuration={0}/>
                  <Line type="linear" dataKey="data.SEFILCARE" name="세필케어" stroke="#ff6600" strokeWidth="7" activeDot={{ r: 5 }} animationDuration={0}/>
                  <Line type="linear" dataKey="data.CHECKSERVER" name="체크서버" stroke="#008ae6" strokeWidth="7" activeDot={{ r: 5 }} animationDuration={0}/>
              </ComposedChart >
          </ResponsiveContainer>
      </ChartContainer>
    );
};

export default Dashboard;