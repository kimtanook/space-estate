import {atom} from "recoil";
import {v4 as uuidv4} from "uuid";

export const LoadingState = atom({
  key: `LoadingState${uuidv4()}`,
  default: true,
});

export const hoverPlanetState = atom({
  key: `hoverPlanetState${uuidv4()}`,
  default: "",
});

export const pathnameState = atom({
  key: `pathnameState${uuidv4()}`,
  default: "/",
});
