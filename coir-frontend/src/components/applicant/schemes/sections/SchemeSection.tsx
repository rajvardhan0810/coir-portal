import { schemes } from "../data/schemes-data";
import { SchemeCard } from "../cards/SchemeCard";

export function SchemesSection() {
  return (
    <section className="schemes-page">
      {/* Left Filters */}

      <aside className="schemes-filters">
        <div className="schemes-filters__header">
          <h3>Scheme Search</h3>
        </div>

        <div className="schemes-filter-group">
          <details open>
            <summary>Scheme Type</summary>

            <label>
              <input type="checkbox" />
              Science & Technology
            </label>

            <label>
              <input type="checkbox" />
              Skill Upgradation
            </label>

            <label>
              <input type="checkbox" />
              Domestic Market Promotion
            </label>

            <label>
              <input type="checkbox" />
              Export Market Promotion
            </label>
          </details>
        </div>

        <div className="schemes-filter-group">
          <details open>
            <summary>
              Type Of Beneficiary
            </summary>

            <label>
              <input type="checkbox" />
              Coir Artisans
            </label>

            <label>
              <input type="checkbox" />
              Exporters
            </label>

            <label>
              <input type="checkbox" />
              Entrepreneurs
            </label>

            <label>
              <input type="checkbox" />
              Institutions
            </label>
          </details>
        </div>

        <button
          type="button"
          className="scheme-search-btn"
        >
          Search
        </button>
      </aside>

      {/* Right Content */}

      <div className="schemes-content">
        <div className="schemes-content__header">
          <h2>Available Schemes</h2>

          <span>
            {schemes.length} Schemes Found
          </span>
        </div>

        <div className="schemes-grid">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
            />
          ))}
        </div>

        {/* Pagination */}

        <div className="schemes-pagination">
          <button>{"<"}</button>

          <button className="active">
            1
          </button>

          <button>2</button>

          <button>3</button>

          <button>{">"}</button>
        </div>

        {/* Chatbot */}

        <button
          type="button"
          className="schemes-chatbot"
        >
          💬
        </button>
      </div>
    </section>
  );
}