import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    title: {
        cursor: 'pointer',
        fontWeight: 700,
        color: '#DC143C'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class StatsModal extends PureComponent {
    render() {
        const { classes, open, toggleOpen, content, children } = this.props;

        return (
            <div>
                <Typography className={classes.title} onClick={toggleOpen}>{children}</Typography>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={toggleOpen}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                        {children}
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        {content}
                    </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

StatsModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsModal);