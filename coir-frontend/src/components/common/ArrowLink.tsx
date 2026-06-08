import { BiChevronRight, BiRightArrowAlt } from "react-icons/bi";

type ArrowLinkProps = {
  href?: string;
  label?: string;
  compact?: boolean;
  className?: string;
};

export function ArrowLink({
  href = "#",
  label = "Learn More",
  compact = false,
  className = "",
}: ArrowLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      className={`${compact ? "icon-link" : "text-link"} ${className}`.trim()}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {compact ? (
        <BiRightArrowAlt aria-hidden />
      ) : (
        <>
          <span>{label}</span>
          <BiChevronRight aria-hidden />
        </>
      )}
    </a>
  );
}
