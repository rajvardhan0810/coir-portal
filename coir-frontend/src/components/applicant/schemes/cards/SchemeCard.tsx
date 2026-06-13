import Image from "next/image";
import Link from "next/link";

import type { Scheme } from "../types/scheme.type";

type Props = {
  scheme: Scheme;
};

export function SchemeCard({
  scheme,
}: Props) {
  return (
    <article className="scheme-card">
      <div className="scheme-card__top">
        <div className="scheme-card__badge">
          {scheme.code}
        </div>

        <div className="scheme-card__icon">
          <Image
            src={scheme.image}
            alt={scheme.title}
            width={28}
            height={28}
          />
        </div>
      </div>

      <h3 className="scheme-card__title">
        {scheme.title}
      </h3>

      <p className="scheme-card__description">
        {scheme.description}
      </p>

      <div className="scheme-card__actions">
        <Link
          href={`/schemes/${scheme.id}`}
          className="scheme-card__apply"
        >
          Apply Now
        </Link>

        <Link
          href={`/schemes/${scheme.id}/details`}
          className="scheme-card__details"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}