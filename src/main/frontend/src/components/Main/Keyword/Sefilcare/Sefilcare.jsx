import React from 'react';
import KeywordDataTable from '../KeywordDataTable';

const Sefilcare = ({ rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleUsage }) => {
    return (
        <KeywordDataTable
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            toggleUsage={toggleUsage}
        />
    );
}

export default Sefilcare;