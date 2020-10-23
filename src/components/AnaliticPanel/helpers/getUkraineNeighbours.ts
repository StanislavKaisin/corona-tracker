import { State } from "../../../interfaces/State";
type StatesObject = { [key: string]: State };

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

export const getUkraineNeighbours = (states: StatesObject) => {
  const arrayOfStates = Object.values(states);
  const UkraineNeighboursLocalWithInfo = ukraineNeighbours.map(
    (UkraineNeighbour) => {
      const findedState = arrayOfStates.find((state) => {
        if (state.countryRegion === UkraineNeighbour) {
          return state;
        }
      });
      return findedState;
    }
  );
  return UkraineNeighboursLocalWithInfo;
};
