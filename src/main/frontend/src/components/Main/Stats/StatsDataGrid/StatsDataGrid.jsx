import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StatsModal from './StatsModal';
import { default as TablePaginationActionsWrapped } from './TablePaginationActions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  pagination: {
    width: '65%',
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class StatsDataGrid extends PureComponent {
  render() {
    const { classes, rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, toggleOpen } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <CustomTableCell align="center">No</CustomTableCell>
                    <CustomTableCell align="center">Date</CustomTableCell>
                    <CustomTableCell align="center">Service</CustomTableCell>
                    <CustomTableCell align="center">Log</CustomTableCell>
                    <CustomTableCell align="center">Status</CustomTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.no}>
                  <TableCell align="center">{row.no}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.serviceNm}</TableCell>
                  <TableCell align="center">
                    <StatsModal 
                      content={row.content} 
                      open={row.open} 
                      toggleOpen={() => toggleOpen(row.no)}>
                        {row.title}
                      </StatsModal>
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className={classes.pagination}
                  rowsPerPageOptions={[5, 10]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

StatsDataGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsDataGrid);