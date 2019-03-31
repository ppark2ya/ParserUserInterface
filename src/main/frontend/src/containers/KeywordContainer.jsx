import React, { PureComponent } from 'react';
import { Header } from '../components/Main/Keyword/Header';
import PropTypes from 'prop-types';
import * as keywordActions from '../modules/keyword';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

class KeywordContainer extends PureComponent {

    static propTypes = {
        result: PropTypes.string,
        DeviceActions: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div>
                <Header/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        result: state.service.data.result
    }),
    (dispatch) => ({
        KeywordActions: bindActionCreators(keywordActions, dispatch),
    })
)(KeywordContainer);