import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

class StatsBox extends Component {
    render() {
        const { classes, children } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                {children}
            </form>
        );
    }
}

StatsBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsBox);