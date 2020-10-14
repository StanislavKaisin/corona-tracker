import React, { Component } from "react";

import coronaHeader from "./asserts/corona_header.png";

import { Cards, Chart, CountryPicker, AnaliticPanel } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api/index.js";

import confirmed from "./api/confirmed.json";

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
    console.log("this.state=", this.state);
    const { data, country } = this.state;
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
        <AnaliticPanel confirmed={confirmed} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
export default App;
