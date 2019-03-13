import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class StatsSelect extends Component {
    render() {
        const { classes, labelPlaceholder, name, menu, value, handleSelChange } = this.props;
        let menuItemList = [];
        
        if(menu) {
            menuItemList = menu.sort(
                (a, b) => (a.serviceCd < b.serviceCd)? -1 : (a.serviceCd < b.serviceCd)? 1: 0
            ).map(
                (obj, idx) => (
                    <MenuItem key={idx} value={obj.serviceCd}>{obj.serviceNm}</MenuItem>
                )
            );
        } else {
            menuItemList = [
                <MenuItem key={0} value="CRITICAL">CRITICAL</MenuItem>,
                <MenuItem key={1} value="NORMAL">NORMAL</MenuItem>
            ];
        }

        return (
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="label-placeholder">
                    {labelPlaceholder}
                </InputLabel>
                <Select
                    value={value}
                    onChange={handleSelChange}
                    input={<Input name={name} />}
                    displayEmpty
                    name={name}
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {menuItemList}
                </Select>
            </FormControl>
        );
    }
}

StatsSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsSelect);