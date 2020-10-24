import { State } from "../../../interfaces/State";
type StatesObject = { [key: string]: State };

export const getMostAffected = (states: StatesObject) => {
  const arrayOfStates = Object.values(states);
  arrayOfStates.sort((state1, state2) => +state2.confirmed - +state1.confirmed);
  const mostAffected = [
    arrayOfStates[0],
    arrayOfStates[1],
    arrayOfStates[2],
    arrayOfStates[3],
    arrayOfStates[4],
    arrayOfStates[6],
    arrayOfStates[7],
  ];
  return mostAffected;
};
