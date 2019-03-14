import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
    },
    search: {
        width: '24px',
        height: '24px',
    }
});

const StatsButton = ({ classes }) => {
    return (
        <Fragment>
            <Button variant="contained" color="primary" className={classes.button}>
                Send
                <svg className={classes.search} viewBox="0 0 24 24">
                    <path fill="#fff" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
            </Button>
        </Fragment>
    );

}

StatsButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsButton);