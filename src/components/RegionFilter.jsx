const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ selected, onSelect }) {
  return (
    <div className="region-filter" role="tablist" aria-label="Filter by region">
      {REGIONS.map((region) => (
        <button
          key={region}
          role="tab"
          aria-selected={selected === region}
          className={`region-filter__pill ${selected === region ? "is-active" : ""}`}
          onClick={() => onSelect(region)}
          type="button"
        >
          {region}
        </button>
      ))}
    </div>
  );
}
