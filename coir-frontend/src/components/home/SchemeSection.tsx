import { ArrowLink } from "@/components/common/ArrowLink";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceIcon } from "@/components/common/ServiceIcon";
import { ROUTES } from "@/constants/routes";

const schemeHighlights = [
  {
    title: "COIR Schemes",
    description: "India is the home of coir where coir weaving started.",
    icon: "flaticon-consulting",
    href: ROUTES.login,
  },
  {
    title: "SFURTI",
    description: "Scheme of Fund for Regeneration of Traditional Industries.",
    icon: "flaticon-effective",
    href: ROUTES.schemesSection,
  },
  {
    title: "PMEGP",
    description: "Prime Minister's Employment Generation Programme.",
    icon: "flaticon-startup",
    href: ROUTES.schemesSection,
  },
  {
    title: "ASPIRE",
    description: "To generate employment and promote new startups.",
    icon: "flaticon-website",
    href: ROUTES.schemesSection,
  },
];

const coirVikasSchemes = [
  {
    title: "CITUS",
    description:
      "Revised Operational Guidelines for Coir Industry Technology Upgradation Scheme.",
    icon: "flaticon-consultant",
    href: ROUTES.schemesSection,
  },
  {
    title: "Science And Technology",
    description: "Central Sector Scheme of Science and Technology.",
    icon: "flaticon-web-development",
    href: ROUTES.schemesSection,
  },
  {
    title: "Skill Upgradation and Mahila Coir Yojana",
    description: "Skill Upgradation and Mahila Coir Yojana.",
    icon: "flaticon-consulting",
    href: ROUTES.login,
  },
];

export function SchemeSection() {
  return (
    <>
      <section className="section section--warm" id="schemes">
        <div className="container feature-grid">
          {schemeHighlights.map((item) => (
            <article className="feature-card" key={item.title}>
              <ServiceIcon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowLink href={item.href} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section yojna-section">
        <div className="container yojna-grid">
          <div className="yojna-copy">
            <SectionHeading
              eyebrow="Coir Vikas Yojna"
              title="Focused support for technology, skills and market access"
              description="Explore flagship scheme areas designed to strengthen entrepreneurs, artisans and coir clusters."
            />
            <ArrowLink href={ROUTES.schemes} label="View Schemes" className="primary-link" />
          </div>
          <div className="service-grid service-grid--three">
            {coirVikasSchemes.map((item) => (
              <article className="service-card service-card--accent" key={item.title}>
                <ServiceIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowLink href={item.href} compact />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
