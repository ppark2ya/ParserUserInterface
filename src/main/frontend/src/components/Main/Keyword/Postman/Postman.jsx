import React from 'react';
import KeywordDataTable from '../KeywordDataTable';

const Postman = ({ rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleUsage, sortTable }) => {
    return (
        <KeywordDataTable
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            toggleUsage={toggleUsage}
            sortTable={sortTable}
        />
    );
}

export default Postman;