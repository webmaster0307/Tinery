export const FETCH_CITY = "FETCH_CITY";

export const fetchCity = cities => ({
  type: FETCH_CITY,
  payload: { cities }
});
