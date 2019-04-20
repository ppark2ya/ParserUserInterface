import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../../modules/login';

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
        color: '#584747'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    formContainer: {
        width: '100%',
        display: 'block',
    },
    labels: {
        width: '30%',
        display: 'inline-block',
    },
    inputs: {
        width: '60%',
        display: 'inline-block',
    },
    submit: {
        width: '13%',
        height: '30px',
        float: 'right',
        marginTop: '0.5rem',
        marginRight: '2.4rem',
        backgroundColor: '#696969',
        color: '#fff',
        border: '0px solid transparent',
        cursor: 'pointer',
    }
});

class LoginModal extends PureComponent {

    handleChange = (e) => {
        const { LoginActions } = this.props;
        const { name, value } = e.target;
        
        LoginActions.setFormData({name, value});
    }

    handleSubmit = async () => {
        const { LoginActions, form } = this.props;
        const response = await LoginActions.signUp(form);

        if(response.data.result === 'SUCCESS') {
            alert('회원가입에 성공하셨습니다');
            LoginActions.toggleOpen();
        }
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { classes, open, form : { id, pw, name, tel, email}, toggleOpen, children, title } = this.props;

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
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            <div className={classes.formContainer}>
                                <div>
                                    <label className={classes.labels}>아이디</label>
                                    <input className={classes.inputs} type="text" name="id" value={id} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={classes.labels}>패스워드</label>
                                    <input className={classes.inputs} type="password" name="pw" id="pw" value={pw} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={classes.labels}>이름</label>
                                    <input className={classes.inputs} type="text" name="name" value={name} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={classes.labels}>전화번호</label>
                                    <input className={classes.inputs} type="text" name="tel" value={tel} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className={classes.labels}>이메일 주소</label>
                                    <input className={classes.inputs} type="email" name="email" value={email} onChange={handleChange}/>
                                </div>
                                <div>
                                    <button className={classes.submit} type="button" onClick={handleSubmit}>제출</button>
                                </div>
                            </div>
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    (state) => ({
        open: state.login.open,
        form: state.login.form,
        result: state.login.data.result
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
    })
)(withStyles(styles)(LoginModal));