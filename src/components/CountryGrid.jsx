import CountryCard from "./CountryCard";

export default function CountryGrid({ countries, favorites, onToggleFavorite, onOpen }) {
  if (countries.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__glyph" aria-hidden="true">🧭</p>
        <p className="empty-state__title">No countries match that search.</p>
        <p className="empty-state__body">Try a different name, or clear the region filter.</p>
      </div>
    );
  }

  return (
    <div className="stamp-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.alpha3Code}
          country={country}
          isFavorite={favorites.has(country.alpha3Code)}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
