import React, { useEffect, useState } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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

const AnaliticPanel = ({ confirmed }) => {
  console.log("confirmed", confirmed);
  const classes = useStyles();
  const [mostAffected, setMostAffected] = useState([]);
  const [G7States, setG7States] = useState([]);
  const [UkraineNeighbours, setUkraineNeighbours] = useState([]);
  useEffect(() => {
    const confirmedToCountries = confirmed.reduce((states, currentState) => {
      if (!states.hasOwnProperty(currentState.countryRegion)) {
        states[currentState.countryRegion] = {
          countryRegion: currentState.countryRegion,
          confirmed: currentState.confirmed,
          deaths: currentState.deaths,
          recovered: currentState.recovered,
        };
      }
      states[currentState.countryRegion].confirmed =
        states[currentState.countryRegion].confirmed + currentState.confirmed;

      states[currentState.countryRegion].deaths =
        states[currentState.countryRegion].deaths + currentState.deaths;

      states[currentState.countryRegion].recovered =
        states[currentState.countryRegion].recovered + currentState.recovered;

      return states;
    }, {});
    // console.log("confirmedToCountries=", confirmedToCountries);
    const mostAffected = (states) => {
      // console.log("states=", states);
      // console.log("typeof states=", typeof states);
      const arrayOfStates = Object.values(states);
      // console.log("arrayOfStates=", arrayOfStates);
      arrayOfStates.sort(
        (state1, state2) => state2.confirmed - state1.confirmed
      );
      // console.log("arrayOfStates=", arrayOfStates);
      const mostAffected = [
        arrayOfStates[0],
        arrayOfStates[1],
        arrayOfStates[2],
        arrayOfStates[3],
        arrayOfStates[4],
        arrayOfStates[6],
      ];
      setMostAffected(mostAffected);
      console.log("mostAffected=", mostAffected);
    };
    mostAffected(confirmedToCountries);
    const G7States = (states) => {
      const arrayOfStates = Object.values(states);
      const G7Local = [...G7];
      const G7LocalWithInfo = G7Local.map((G7State) => {
        const findedState = arrayOfStates.find((state) => {
          if (state.countryRegion === G7State) {
            return state;
          }
        });
        return findedState;
      });
      return G7LocalWithInfo;
    };
    setG7States(G7States(confirmedToCountries));

    const UkraineNeighbours = (states) => {
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
      return UkraineNeighboursLocalWithInfo;
    };
    setUkraineNeighbours(UkraineNeighbours(confirmedToCountries));
  }, []);

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
          <Typography>{JSON.stringify(mostAffected, null, 2)}</Typography>
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
          <Typography>{JSON.stringify(G7States, null, 2)}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Ukraine`s Neighbour
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{JSON.stringify(UkraineNeighbours, null, 2)}</Typography>
          <StatesTable />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default AnaliticPanel;
