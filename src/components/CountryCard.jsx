import { memo } from "react";

function formatPopulation(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function CountryCard({ country, isFavorite, onToggleFavorite, onOpen }) {
  const capital = country.capital || "No capital";

  return (
    <article className="stamp" style={{ "--tilt": country.tilt }}>
      <button
        className="stamp__surface"
        onClick={() => onOpen(country)}
        aria-label={`View details for ${country.name}`}
        type="button"
      >
        <div className="stamp__flag-wrap">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name}`}
            className="stamp__flag"
            loading="lazy"
            width="64"
            height="48"
          />
        </div>
        <h3 className="stamp__name">{country.name}</h3>
        <p className="stamp__capital">{capital}</p>
        <div className="stamp__meta">
          <span className="stamp__badge">{country.region}</span>
          <span className="stamp__pop mono">{formatPopulation(country.population)}</span>
        </div>
      </button>

      <button
        className={`stamp__fav ${isFavorite ? "is-active" : ""}`}
        onClick={() => onToggleFavorite(country.alpha3Code)}
        aria-label={isFavorite ? `Remove ${country.name} from favorites` : `Add ${country.name} to favorites`}
        aria-pressed={isFavorite}
        type="button"
      >
        ★
      </button>
    </article>
  );
}

// Re-render only when this specific country's favorite status changes —
// keeps typing in the search box smooth even with 250 cards on screen.
export default memo(CountryCard);
