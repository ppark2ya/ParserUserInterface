import React from "react";
import PropTypes from 'prop-types';
import { DatePicker, MuiPickersUtilsProvider  } from "material-ui-pickers";
import moment from "moment";
import "moment/locale/ko";
import MomentUtils from "@date-io/moment";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    picker: {
        margin: theme.spacing.unit * 2,
    },
});

moment.locale("ko");

const StatsCalendar = ({ classes, name, label, value, handleChange }) => {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment} >
        <div className={classes.picker}>
          <DatePicker
              keyboard
              key={name}
              name={name}
              label={label}
              format="YYYY/MM/DD"
              mask={value =>
                value ? [/\d/, /\d/, /\d/, /\d/,"/", /\d/, /\d/, "/", /\d/, /\d/] : []
              }
              value={value}
              onChange={handleChange(name)}
              disableOpenOnEnter
              animateYearScrolling={false}
              showTodayButton={true}
              disableFuture={true}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
};

StatsCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsCalendar);