import { useEffect, useRef } from "react";

function formatNumber(n) {
  return n?.toLocaleString("en-US") ?? "—";
}

// languages/currencies are arrays of objects on this API (countries.dev),
// not keyed objects like the old restcountries.com shape.
function listLanguages(languages) {
  if (!languages || languages.length === 0) return "—";
  return languages.map((l) => l.name).join(", ");
}

function listCurrencies(currencies) {
  if (!currencies || currencies.length === 0) return "—";
  return currencies.map((c) => `${c.name} (${c.symbol ?? "—"})`).join(", ");
}

export default function CountryDetail({ country, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!country) return null;

  const [lat, lng] = country.latlng ?? [];

  return (
    <div className="detail-overlay" onClick={onClose}>
      <aside
        className="passport"
        onClick={(e) => e.stopPropagation()}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${country.name}`}
      >
        <button className="passport__close" onClick={onClose} aria-label="Close details" type="button">
          ×
        </button>

        <div className="passport__header">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name}`}
            className="passport__flag"
          />
          <div>
            <p className="passport__eyebrow">{country.region}</p>
            <h2 className="passport__title">{country.name}</h2>
          </div>
        </div>

        <dl className="passport__facts">
          <div className="passport__fact">
            <dt>Capital</dt>
            <dd>{country.capital || "—"}</dd>
          </div>
          <div className="passport__fact">
            <dt>Population</dt>
            <dd className="mono">{formatNumber(country.population)}</dd>
          </div>
          <div className="passport__fact">
            <dt>Area</dt>
            <dd className="mono">{formatNumber(country.area)} km²</dd>
          </div>
          <div className="passport__fact">
            <dt>Languages</dt>
            <dd>{listLanguages(country.languages)}</dd>
          </div>
          <div className="passport__fact">
            <dt>Currencies</dt>
            <dd>{listCurrencies(country.currencies)}</dd>
          </div>
          {lat !== undefined && (
            <div className="passport__fact">
              <dt>Coordinates</dt>
              <dd className="mono">{lat.toFixed(2)}°, {lng.toFixed(2)}°</dd>
            </div>
          )}
        </dl>

        {lat !== undefined && (
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="passport__map-link"
          >
            View on map ↗
          </a>
        )}
      </aside>
    </div>
  );
}
