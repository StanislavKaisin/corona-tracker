import { State } from "../../../interfaces/State";
type StatesObject = { [key: string]: State };

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

export const getG7StatesInfo = (states: StatesObject) => {
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
  return G7LocalWithInfo;
};
