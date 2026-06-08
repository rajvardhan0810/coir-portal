import Image from "next/image";
import { ArrowLink } from "@/components/common/ArrowLink";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ROUTES } from "@/constants/routes";

const successStories = [
  {
    title: "Women Empowerment",
    image: "/assets/images/success1.jpg",
    alt: "Women Empowerment",
  },
  {
    title: "RG Enterprises 3.0",
    image: "/assets/images/success2.jpg",
    alt: "RG Enterprises 3.0",
  },
  {
    title: "Sri Durga Raja Rajeswari",
    image: "/assets/images/success3.jpg",
    alt: "Sri Durga Raja Rajeswari",
  },
  {
    title: "Allepey Fibre Tuft 3.0",
    image: "/assets/images/success4.jpg",
    alt: "Allepey Fibre Tuft 3.0",
  },
  {
    title: "Sagar Coir Products",
    image: "/assets/images/success5.jpg",
    alt: "Sagar Coir Products",
  },
];

export function SuccessStories() {
  return (
    <section className="section" id="success-stories">
      <div className="container">
        <SectionHeading
          eyebrow="Success Stories"
          title="Stories from India's coir ecosystem"
          align="center"
        />
      </div>
      <div className="story-row">
        {successStories.map((story) => (
          <article className="story-card" key={story.title}>
            <Image src={story.image} alt={story.alt} width={360} height={270} />
            <div>
              <h3>{story.title}</h3>
              <ArrowLink href={ROUTES.successStories} compact />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
