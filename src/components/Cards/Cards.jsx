import React from "react";
import styles from "./Cards.module.css";

import CovidCard from "../CovidCard/CovidCard"

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <CovidCard 
        title='Infected'
        value={confirmed.value}
        className={'infected'}
        lastUpdate={lastUpdate}
      />
      <CovidCard 
        title='Deaths'
        value={deaths.value}
        className={'deaths'}
        lastUpdate={lastUpdate}
      />
      <CovidCard 
        title='Recovered'
        value={recovered.value}
        className={'recovered'}
        lastUpdate={lastUpdate}
      />
    </div>
  );
};
export default Cards;
