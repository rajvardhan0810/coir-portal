import { courses } from "../data/courses-data";
import { CourseCard } from "../cards/CourseCard";

type Props = {
  schemeId: string;
  schemeTitle: string;
};

export function CoursesSection({
  schemeId,
  schemeTitle,
}: Props) {
  const filteredCourses = courses.filter(
    (course) => course.schemeId === schemeId,
  );

  return (
    <section className="courses-layout">
      {/* LEFT FILTER PANEL */}

      <aside className="courses-filters">
        <div className="courses-filter-group">
          <div className="courses-filter-title">
            Scheme Type
          </div>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Science & Technology (S&T)
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Skill Upgradation
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Marketing Promotion
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Procurement
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Finance and Subsidy
          </label>

          <label>
            <input type="checkbox" />
            Welfare Measures
          </label>
        </div>

        <div className="courses-filter-group">
          <div className="courses-filter-title">
            Type of Beneficiary
          </div>

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
            Showrooms
          </label>

          <label>
            <input type="checkbox" />
            Sales Depot
          </label>

          <label>
            <input type="checkbox" />
            Trainers
          </label>
        </div>

        <button
          type="button"
          className="courses-search-btn"
        >
          Search
        </button>
      </aside>

      {/* RIGHT CONTENT */}

      <div className="courses-content">
        <div className="courses-page__header">
          <div>
            <span className="courses-page__eyebrow">
              COIR VIKAS YOJANA
            </span>

            <h1 className="courses-page__title">
              {schemeTitle}
            </h1>
          </div>

          <div className="courses-toolbar">
            <select>
              <option>
                Latest Schemes
              </option>

              <option>
                Oldest Schemes
              </option>
            </select>

            <button type="button">
              ⬛
            </button>

            <button type="button">
              ☰
            </button>
          </div>
        </div>

        <div className="courses-page__grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              schemeId={schemeId}
            />
          ))}
        </div>

        <div className="courses-footer">
          <button
            type="button"
            className="courses-back-btn"
          >
            Back
          </button>

          <div className="courses-pagination">
            <span>
              Showing 1 to 6 of 7
            </span>

            <div>
              <button>{"<"}</button>

              <button className="active">
                1
              </button>

              <button>2</button>

              <button>{">"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}