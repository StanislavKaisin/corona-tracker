import React, { useEffect, useState } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import StatesTable from "../StatesTable/StatesTable";
import { fetchDailyDataByDate } from "../../api";

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

const G7 = [
  "US",
  "Japan",
  "Germany",
  "France",
  "United Kingdom",
  "Italy",
  "Canada",
  "China",
];

const ukraineNeighbours = [
  "Ukraine",
  "Poland",
  "Slovakia",
  "Hungary",
  "Romania",
  "Turkey",
  "Moldova",
  "Belarus",
  "Russia",
];

// console.log(confirmed);

export interface State {
  countryRegion: string;
  confirmed: number | string;
  deaths: number | string;
  recovered: number | string;
}

interface AnaliticPanelProps {
  confirmed?: State[];
  lastUpdate?: string;
}

type StatesObject = { [key: string]: State };

const AnaliticPanel = ({ lastUpdate }: AnaliticPanelProps) => {
  // console.log("confirmed", confirmed);

  const classes = useStyles();

  // const [confirmed, setConfirmed] = useState<(State | undefined)[]>([]);

  const [mostAffected, setMostAffected] = useState<State[]>([]);
  const [G7States, setG7States] = useState<(State | undefined)[]>([]);
  const [UkraineNeighbours, setUkraineNeighbours] = useState<
    (State | undefined)[]
  >([]);

  useEffect(() => {
    console.log("lastUpdate analiticPanel=", lastUpdate);
    if (lastUpdate) {
      fetchDailyDataByDate(lastUpdate).then((confirmed: State[]) => {
        console.log("confirmed=", confirmed);
        const confirmedToCountries =
          confirmed &&
          confirmed.reduce<StatesObject>((states, currentState) => {
            if (!states.hasOwnProperty(currentState!.countryRegion)) {
              states[currentState!.countryRegion] = {
                countryRegion: currentState!.countryRegion,
                confirmed: currentState!.confirmed,
                deaths: currentState!.deaths,
                recovered: currentState!.recovered,
              };
            }
            states[currentState!.countryRegion].confirmed =
              +states[currentState!.countryRegion].confirmed +
              +currentState!.confirmed;

            states[currentState!.countryRegion].deaths =
              +states[currentState!.countryRegion].deaths +
              +currentState!.deaths;

            states[currentState!.countryRegion].recovered =
              +states[currentState!.countryRegion].recovered +
              +currentState!.recovered;

            return states;
          }, {});
        // console.log("confirmedToCountries=", confirmedToCountries);
        const mostAffected = (states: StatesObject) => {
          // console.log("states=", states);
          // console.log("typeof states=", typeof states);
          const arrayOfStates = Object.values(states);
          // console.log("arrayOfStates=", arrayOfStates);
          arrayOfStates.sort(
            (state1, state2) => +state2.confirmed - +state1.confirmed
          );
          // console.log("arrayOfStates=", arrayOfStates);
          const mostAffected = [
            arrayOfStates[0],
            arrayOfStates[1],
            arrayOfStates[2],
            arrayOfStates[3],
            arrayOfStates[4],
            arrayOfStates[6],
            arrayOfStates[7],
          ];
          setMostAffected(mostAffected);
        };
        mostAffected(confirmedToCountries);

        const G7States = (states: StatesObject) => {
          const arrayOfStates = Object.values(states);
          const G7Local = [...G7];
          const G7LocalWithInfo = G7Local.map((G7State) => {
            const findedState = arrayOfStates.find((state) => {
              if (state.countryRegion === G7State) {
                return state;
              }
            });
            if (findedState) return findedState;
          });
          setG7States(G7LocalWithInfo);
        };
        G7States(confirmedToCountries);

        const UkraineNeighbours = (states: StatesObject) => {
          const arrayOfStates = Object.values(states);
          const UkraineNeighboursLocalWithInfo = ukraineNeighbours.map(
            (UkraineNeighbour) => {
              const findedState = arrayOfStates.find((state) => {
                if (state.countryRegion === UkraineNeighbour) {
                  // console.log("state=", state);
                  return state;
                }
              });
              return findedState;
            }
          );
          setUkraineNeighbours(UkraineNeighboursLocalWithInfo);
        };
        UkraineNeighbours(confirmedToCountries);
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
          {/* <Typography>{JSON.stringify(mostAffected, null, 2)}</Typography> */}
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
          {/* <Typography>{JSON.stringify(G7States, null, 2)}</Typography> */}
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
          {/* <Typography>{JSON.stringify(UkraineNeighbours, null, 2)}</Typography> */}
          <StatesTable states={UkraineNeighbours} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default AnaliticPanel;
