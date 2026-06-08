import Image from "next/image";
import { SectionHeading } from "@/components/common/SectionHeading";

const aboutParagraphs = [
  "In Sanskrit, the coconut palm is called kalpa vriksha, which is defined as the tree which provides all the necessities of life. India is the home of coir where coir weaving started developing since 1859 in Alleppey from where it spread to different parts of India.",
  "The coconut fibre extracted from the husk of coconuts is one of the hardest natural fibres and is preferred for applications like soil erosion control, soil reinforcement and stabilization. Coir is an eco-friendly product with wide potential across India.",
];

const leaders = [
  {
    name: "Shri Jitan Ram Manjhi",
    role: "The Honorable Union Minister, MSME",
    image: "/assets/images/manjhiji.png",
    alt: "Shri Jitan Ram Manjhi",
  },
  {
    name: "Sushri Shobha Karandlaje",
    role: "Honourable Minister of State, MSME",
    image: "/assets/images/sobhaji.png",
    alt: "Sushri Shobha Karandlaje",
  },
  {
    name: "Shri Vipul Goel",
    role: "Chairman, Coir Board",
    image: "/assets/images/vipulji.png",
    alt: "Shri Vipul Goel",
  },
];

export function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <SectionHeading eyebrow="About Coir Board" title="Promoting India's coir industry" />
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="leader-grid" aria-label="Leadership">
          {leaders.map((leader) => (
            <article className="leader-card" key={leader.name}>
              <div className="leader-photo">
                <Image src={leader.image} alt={leader.alt} width={160} height={160} />
              </div>
              <h3>{leader.name}</h3>
              <p>{leader.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
