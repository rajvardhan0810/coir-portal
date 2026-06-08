import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceIcon } from "@/components/common/ServiceIcon";
import { ROUTES } from "@/constants/routes";

const connectCards = [
  {
    title: "Business Guidance Cell",
    icon: "flaticon-consultant",
    href: ROUTES.connect,
  },
  {
    title: "Branch/Regional Offices",
    icon: "flaticon-project",
    href: ROUTES.connect,
  },
  {
    title: "Showrooms",
    icon: "flaticon-bullhorn",
    href: ROUTES.connect,
  },
  {
    title: "Research Centers",
    icon: "flaticon-data-analytics",
    href: ROUTES.connect,
  },
];

export function ConnectSection() {
  return (
    <section className="section connect-section" id="connect">
      <div className="container">
        <SectionHeading
          eyebrow="Handholding"
          title="Guidance points for entrepreneurs and stakeholders"
          align="center"
        />
        <div className="service-grid">
          {connectCards.map((item) => (
            <article className="service-card" key={item.title}>
              <ServiceIcon name={item.icon} />
              <h3>{item.title}</h3>
              <ArrowLink href={item.href} compact />
            </article>
          ))}
        </div>
      </div>
      <Image
        className="service-shape"
        src="/assets/images/shape/service-shape1.png"
        alt=""
        width={320}
        height={320}
        aria-hidden
      />
    </section>
  );
}
