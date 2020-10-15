import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { State } from "../AnaliticPanel/AnaliticPanel";
import CountUp from "react-countup";
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: "1rem",
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 280,
  },
});

interface StatesTableProps {
  states: (State | undefined)[];
}

export default function StatesTable({ states }: StatesTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
            <StyledTableCell align="right">Confirmed</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {states?.map((state) => (
            <StyledTableRow key={state?.countryRegion}>
              <StyledTableCell component="th" scope="row">
                {state?.countryRegion}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography>
                  <CountUp
                    start={0}
                    end={state ? +state.deaths : 0}
                    duration={2.1}
                    separator={"."}
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography>
                  <CountUp
                    start={0}
                    end={state ? +state?.confirmed : 0}
                    duration={2.1}
                    separator={"."}
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography>
                  <CountUp
                    start={0}
                    end={state ? +state?.recovered : 0}
                    duration={2.1}
                    separator={"."}
                  />
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell align="right">
              <Typography>
                <CountUp
                  start={0}
                  end={states?.reduce((acc, state) => {
                    return (acc += state ? +state?.deaths : 0);
                  }, 0)}
                  duration={2.1}
                  separator={"."}
                />
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography>
                <CountUp
                  start={0}
                  end={states?.reduce((acc, state) => {
                    return (acc += state ? +state?.confirmed : 0);
                  }, 0)}
                  duration={2.1}
                  separator={"."}
                />
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography>
                <CountUp
                  start={0}
                  end={states?.reduce((acc, state) => {
                    return (acc += state ? +state?.recovered : 0);
                  }, 0)}
                  duration={2.1}
                  separator={"."}
                />
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
