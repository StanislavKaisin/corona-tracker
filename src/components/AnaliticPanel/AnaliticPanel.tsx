import React, { useEffect, useState } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import StatesTable from "../StatesTable/StatesTable";
import { fetchDailyDataByDate } from "../../api";
import { State } from "../../interfaces/State";
import { getG7StatesInfo } from "./helpers/getG7StatesInfo";
import { getUkraineNeighbours } from "./helpers/getUkraineNeighbours";
import { getMostAffected } from "./helpers/getMostAffected";
import { getConfirmedToCountries } from "./helpers/getConfirmedToCountries";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 820,
    marginBottom: "1rem",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

interface AnaliticPanelProps {
  confirmed?: State[];
  lastUpdate?: string;
}

const AnaliticPanel = ({ lastUpdate }: AnaliticPanelProps) => {
  const classes = useStyles();
  const [mostAffected, setMostAffected] = useState<State[]>([]);
  const [G7States, setG7States] = useState<(State | undefined)[]>([]);
  const [UkraineNeighbours, setUkraineNeighbours] = useState<
    (State | undefined)[]
  >([]);

  useEffect(() => {
    if (lastUpdate) {
      fetchDailyDataByDate(lastUpdate).then((confirmed: State[]) => {
        //getConfirmedToCountries
        const confirmedToCountries = getConfirmedToCountries(confirmed);

        const mostAffectedInfo = getMostAffected(confirmedToCountries);
        setMostAffected(mostAffectedInfo);

        const G7StatesInfo = getG7StatesInfo(confirmedToCountries);
        setG7States(G7StatesInfo);

        const UkraineNeighboursInfo = getUkraineNeighbours(
          confirmedToCountries
        );
        setUkraineNeighbours(UkraineNeighboursInfo);
      });
    }
  }, [lastUpdate]);

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Most affected</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StatesTable states={mostAffected} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>G7 Countries</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StatesTable states={G7States} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Ukraine&Neighbours
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StatesTable states={UkraineNeighbours} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default AnaliticPanel;
