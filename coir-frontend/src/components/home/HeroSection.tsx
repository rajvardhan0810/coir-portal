import Image from "next/image";

const heroSlides = [
  {
    image: "/assets/images/banner1.png",
    alt: "Coir Board portal banner",
  },
  {
    image: "/assets/images/banner2.png",
    alt: "Coir Board digital services banner",
  },
];

export function HeroSection() {
  return (
    <section className="hero" aria-label="Coir Board portal highlights">
      <div className="hero-track">
        {heroSlides.map((slide) => (
          <div className="hero-slide" key={slide.image}>
            <Image
              src={slide.image}
              alt={slide.alt}
              width={1440}
              height={560}
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
