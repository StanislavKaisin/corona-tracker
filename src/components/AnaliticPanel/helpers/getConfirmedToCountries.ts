import { State } from "../../../interfaces/State";
type StatesObject = { [key: string]: State };

export const getConfirmedToCountries = (confirmed: State[]) =>
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
      +states[currentState!.countryRegion].confirmed + +currentState!.confirmed;

    states[currentState!.countryRegion].deaths =
      +states[currentState!.countryRegion].deaths + +currentState!.deaths;

    states[currentState!.countryRegion].recovered =
      +states[currentState!.countryRegion].recovered + +currentState!.recovered;

    return states;
  }, {});
