import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import coronaHeader from "./asserts/corona_header.png";

import { Cards, Chart, CountryPicker, AnaliticPanel } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api/index.js";

class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    // console.log("this.state=", this.state);
    const { data, country } = this.state;
    const lastUpdate = this.state.data?.lastUpdate;
    console.log("lastUpdate=", lastUpdate);
    console.log("typeof lastUpdate=", typeof lastUpdate);
    return (
      <div className={styles.container}>
        <img
          src={coronaHeader}
          alt="COVID-19"
          with={300}
          height={72}
          className={styles.image}
        />
        <Cards data={data} />
        <AnaliticPanel lastUpdate={lastUpdate} />
        <Typography
          variant="caption"
          color="textSecondary"
          styles={{ marginBottom: "2rem" }}
        >
          Data by{" "}
          <a
            href="https://github.com/mathdroid/covid-19-api"
            rel="noreferrer noopener"
            target="_blank"
          >
            https://github.com/mathdroid/covid-19-api
          </a>
        </Typography>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
export default App;
