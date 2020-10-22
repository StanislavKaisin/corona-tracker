import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country = "") => {
  let changeableURL = url;
  if (country) {
    changeableURL = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);
    // console.log("data fetchData=", data);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    // console.log("data fetchDailyData=", data);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
export const fetchDailyDataByDate = async (lastUpdate) => {
  try {
    // console.log("lastUpdate=", lastUpdate);
    const dayAsMs = Date.parse(lastUpdate) - 24 * 60 * 60 * 1000;
    // console.log("dayAsMs=", dayAsMs);
    const dayForFetch = new Date(dayAsMs).toLocaleDateString();
    // console.log("dayForFetch=", dayForFetch);
    const dayAsArray = dayForFetch.split(".");
    const day = Array(dayAsArray[1], dayAsArray[0], dayAsArray[2]).join("-");
    // console.log("day=", day);
    const { data } = await axios.get(`${url}/daily/${day}`);
    console.log("fetchDailyDataByDate data=", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
