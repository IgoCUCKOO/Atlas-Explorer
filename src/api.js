// RestCountries v3.1 (the API this project originally used) was shut down
// without a free unauthenticated replacement — v5 requires an API key and
// a signup. countries.dev is a free, keyless, CORS-enabled alternative
// with an equivalent (but not identical) data shape — see the field notes
// in App.jsx and the components for the specific differences.
const BASE_URL = "https://countries.dev";

const FIELDS = [
  "name",
  "alpha3Code",
  "region",
  "capital",
  "population",
  "area",
  "flags",
  "languages",
  "currencies",
  "latlng",
].join(",");

export async function fetchAllCountries() {
  const res = await fetch(`${BASE_URL}/countries?fields=${FIELDS}`);
  if (!res.ok) {
    throw new Error(`Failed to load countries (${res.status})`);
  }
  return res.json();
}
