import { ROUTES } from "@/constants/routes";

const newsUpdates = [
  {
    date: "01 Apr 2026",
    title:
      "Tender in CPP Portal for Supply, Installation and Commissioning of Lab Equipments at CCRI & CICT (under ATI Scheme).",
    href: ROUTES.news,
  },
  {
    date: "28 Mar 2026",
    title: "New education policy focuses on digital transformation",
    href: ROUTES.news,
  },
  {
    date: "25 Mar 2026",
    title: "Smart city projects receive additional funding nationwide",
    href: ROUTES.news,
  },
];

export function NewsSection() {
  return (
    <section className="news-ticker" id="news" aria-label="Latest news">
      <h2>Latest News</h2>
      <div className="ticker-viewport">
        <ul>
          {[...newsUpdates, ...newsUpdates].map((item, index) => (
            <li key={`${item.date}-${index}`}>
              <a href={item.href}>
                <time>{item.date}</time>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
