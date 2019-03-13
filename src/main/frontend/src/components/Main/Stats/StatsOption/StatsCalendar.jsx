import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
class StatsCalendar extends Component {
    state = {
        startDate: new Date()
    };
 
    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }
  
    render() {
        const { name, classNm, value } = this.props;
        return (
        <DatePicker
            selected={value}
            onChange={this.handleChange}
            name={name}
            className={classNm}
            dateFormat="YYYY-MM-dd"
        />
        );
    }
}
export default StatsCalendar;