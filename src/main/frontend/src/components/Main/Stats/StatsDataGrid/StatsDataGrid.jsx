import React from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' } 
];

const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

const StatsDataGrid = () => {
    return (
        <ReactDataGrid
            minWidth={1464}
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={3}
            // minHeight={150} 
        />
    );
};

export default StatsDataGrid;