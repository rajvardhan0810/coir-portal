import Link from "next/link";

import type { Program } from "../types/programs.type";

type Props = {
  schemeId: string;
  program: Program;
};

export function ProgramsCard({
  schemeId,
  program,
}: Props) {
  const tags =
    program.tags?.length
      ? program.tags
      : program.category
        ? [program.category]
        : [];

  return (
    <article className="scheme-course-card">
      <div className="scheme-course-card__top">
        <div className="scheme-course-card__badges">
          {tags.map((tag) => (
            <span
              key={tag}
              className="scheme-course-card__badge"
            >
              {tag}
            </span>
          ))}
        </div>

        {program.level ? (
          <span className="scheme-course-card__level">
            {program.level}
          </span>
        ) : null}
      </div>

      <h3 className="scheme-course-card__title">
        {program.title}
      </h3>

      <div className="scheme-course-card__meta">
        {program.duration ? (
          <span>{program.duration}</span>
        ) : null}

        {program.benefit ? (
          <span>{program.benefit}</span>
        ) : null}
      </div>

      <div className="scheme-course-card__actions">
        <Link
          href={`/schemes/${schemeId}/${program.id}/apply`}
          className="scheme-course-card__apply"
        >
          Apply Now
        </Link>

        <Link
          href={`/schemes/${schemeId}/details`}
          className="scheme-course-card__details"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
