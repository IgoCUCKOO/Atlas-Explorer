import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchAllCountries } from "./api";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { useFavorites } from "./hooks/useFavorites";
import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import CountryGrid from "./components/CountryGrid";
import CountryDetail from "./components/CountryDetail";

// Deterministic pseudo-random tilt per country (based on its code) so the
// stamp grid feels hand-placed instead of perfectly aligned, without the
// angle jittering on every re-render.
function tiltFor(code) {
  let hash = 0;
  for (let i = 0; i < code.length; i++) hash = (hash * 31 + code.charCodeAt(i)) >>> 0;
  return ((hash % 600) / 100 - 3).toFixed(2); // range roughly -3deg to +3deg
}
export default function App() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [openCountry, setOpenCountry] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();
  const debouncedSearch = useDebouncedValue(search, 200);

  useEffect(() => {
    let cancelled = false;

    fetchAllCountries()
      .then((data) => {
        if (cancelled) return;
        const withTilt = data
          .map((c) => ({ ...c, tilt: `${tiltFor(c.alpha3Code)}deg` }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(withTilt);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCountries = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return countries.filter((c) => {
      if (region !== "All" && c.region !== region) return false;
      if (showFavoritesOnly && !favorites.has(c.alpha3Code)) return false;
      if (query && !c.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [countries, region, showFavoritesOnly, favorites, debouncedSearch]);

  const handleOpen = useCallback((country) => setOpenCountry(country), []);
  const handleClose = useCallback(() => setOpenCountry(null), []);

  return (
    <div className="app">
      <header className="hero">
        <p className="hero__eyebrow">A field guide to every country on Earth</p>
        <h1 className="hero__title">Atlas</h1>
        <p className="hero__subtitle">
          Search, filter, and collect stamps from all {countries.length || "…"} countries — capitals,
          population, languages, and currencies, pulled live.
        </p>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter selected={region} onSelect={setRegion} />
        <button
          type="button"
          className={`fav-toggle ${showFavoritesOnly ? "is-active" : ""}`}
          onClick={() => setShowFavoritesOnly((v) => !v)}
          aria-pressed={showFavoritesOnly}
        >
          ★ Favorites {favorites.size > 0 ? `(${favorites.size})` : ""}
        </button>
      </div>

      <main>
        {status === "loading" && (
          <div className="status-block">
            <p>Loading the atlas…</p>
          </div>
        )}

        {status === "error" && (
          <div className="status-block status-block--error">
            <p>Couldn't reach the countries API. Check your connection and reload.</p>
          </div>
        )}

        {status === "ready" && (
          <>
            <p className="result-count mono">
              {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
            </p>
            <CountryGrid
              countries={filteredCountries}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpen={handleOpen}
            />
          </>
        )}
      </main>

      <CountryDetail country={openCountry} onClose={handleClose} />
    </div>
  );
}
