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
import { default as TablePaginationActionsWrapped } from '../Stats/StatsDataGrid/TablePaginationActions';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '80%',
    margin: `${theme.spacing.unit * 3}px auto`,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  keyWidth: {
    width: '80%'
  },
  ynWidth: {
    width: '20%'
  },
  pagination: {
    width: '65%',
  },
  button: {
    margin: theme.spacing.unit,
  },
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

class KeywordDataTable extends PureComponent {
  render() {
    const { classes, rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, toggleUsage } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <CustomTableCell className={classes.keyWidth} align="center">Keyword</CustomTableCell>
                    <CustomTableCell className={classes.ynWidth} align="center">Y / N</CustomTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{row.keyword}</TableCell>
                  <TableCell align="center">
                    <Button color={(row.useCl === '1')? 'primary' : 'secondary'} className={classes.button} onClick={() => toggleUsage(row.keyword, row.serviceCd, row.useCl)}>
                      {(row.useCl === '1')? '사용 중' : '미사용 중'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows === 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell  style={{ textAlign: 'center' }} colSpan={6}>
                    No Data
                  </TableCell>
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

KeywordDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KeywordDataTable);