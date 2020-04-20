import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "./../../api/index";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPICountries = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPICountries();
    return () => {
      //cleanup
    };
  }, [setFetchedCountries]);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(event) => {
          handleCountryChange(
            event.target.value === "global" ? "" : event.target.value
          );
        }}
      >
        <option value="global">Select state</option>
        {fetchedCountries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
