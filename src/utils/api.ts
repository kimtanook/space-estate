import axios from "axios";

export const getPlanetPriceData = async () => {
  return axios.get("/api/planet");
};
