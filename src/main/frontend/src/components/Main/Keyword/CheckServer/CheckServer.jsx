import React from 'react';
import KeywordDataTable from '../KeywordDataTable';

const CheckServer = ({ rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleUsage, sortTable }) => {
    return (
        <div>
            <KeywordDataTable
                rows={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                toggleUsage={toggleUsage}
                sortTable={sortTable}
            />
        </div>
    );
}

export default CheckServer;

