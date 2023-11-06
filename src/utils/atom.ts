import {atom} from "recoil";
import {v4 as uuidv4} from "uuid";

export const rotateState = atom({
  key: `rotateState${uuidv4()}`,
  default: true,
});

export const hoverPlanetState = atom({
  key: `hoverPlanetState${uuidv4()}`,
  default: "",
});
