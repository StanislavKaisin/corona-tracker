import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./CovidCard.module.css";
import CountUp from "react-countup";
import classesNames from "classnames";

const covidCard = ( {title, value, className, lastUpdate}) => {
  return (
    <Grid
      container
      spacing={2}
      justify="center"
      className={classesNames(styles.card, styles[className])}
    >
      <Grid item component={Card} xs={12}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={value}
              duration={2.1}
              separator={"."}
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2">
            Number of active cases of COVID-19
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
};
export default covidCard;
