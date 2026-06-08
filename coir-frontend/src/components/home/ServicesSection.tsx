import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ROUTES } from "@/constants/routes";

const registrationCards = [
  {
    title: "Coir Manufacturers",
    image: "/assets/images/services-img4.jpg",
    alt: "Coir Manufacturers",
    href: ROUTES.register,
  },
  {
    title: "Exporters",
    image: "/assets/images/services-img3.jpg",
    alt: "Exporters",
    href: ROUTES.register,
  },
  {
    title: "Clusters",
    image: "/assets/images/services-img2.jpg",
    alt: "Clusters",
    href: ROUTES.register,
  },
  {
    title: "Trade Events",
    image: "/assets/images/services-img1.jpg",
    alt: "Trade Events",
    href: ROUTES.registerSection,
  },
];

export function ServicesSection() {
  return (
    <section className="section section--warm" id="register">
      <div className="container">
        <SectionHeading
          eyebrow="Ecosystem Connect"
          title="Register and connect with Coir Board services"
          align="center"
        />
        <div className="image-card-grid">
          {registrationCards.map((item) => (
            <article className="image-card" key={item.title}>
              <Image src={item.image} alt={item.alt} width={360} height={270} />
              <div>
                <h3>{item.title}</h3>
                <ArrowLink href={item.href} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
