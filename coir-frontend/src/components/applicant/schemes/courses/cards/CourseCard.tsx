import Link from "next/link";

import type { Course } from "../types/course.type";

type Props = {
  schemeId: string;
  course: Course;
};

export function CourseCard({
  schemeId,
  course,
}: Props) {
  return (
    <article className="scheme-course-card">
      <div className="scheme-course-card__top">
        <div className="scheme-course-card__badges">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="scheme-course-card__badge"
            >
              {tag}
            </span>
          ))}
        </div>

        {course.level ? (
          <span className="scheme-course-card__level">
            {course.level}
          </span>
        ) : null}
      </div>

      <h3 className="scheme-course-card__title">
        {course.title}
      </h3>

      <div className="scheme-course-card__meta">
        {course.duration ? (
          <span>{course.duration}</span>
        ) : null}

        {course.benefit ? (
          <span>{course.benefit}</span>
        ) : null}
      </div>

      <div className="scheme-course-card__actions">
        <Link
          href={`/schemes/${schemeId}/${course.id}/apply`}
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