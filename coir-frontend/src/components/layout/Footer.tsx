import Image from "next/image";
import Link from "next/link";
import { BiChevronRight, BiEnvelope, BiMap, BiPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { quickLinks } from "@/constants/routes";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebookF },
  { label: "Twitter", href: "https://twitter.com/?lang=en", icon: FaTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link href="/" aria-label="Coir Board home">
            <Image
              src="/assets/images/logo-footer.svg"
              alt="Coir Board"
              width={260}
              height={84}
            />
          </Link>
          <p>
            The Coir Board is a statutory body of the Government of India,
            functioning under the Ministry of Micro, Small & Medium Enterprises
            (MSME). It was established under the Coir Industry Act, 1953 with
            the objective of promoting the coir industry across the country.
          </p>
          <ul className="social-list" aria-label="Social links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <h3>Quick Link</h3>
          <ul>
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href}>
                  <BiChevronRight aria-hidden />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <BiMap aria-hidden />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Coir%20House%20Coir%20Board%20MG%20Road%20Kochi%20Kerala%20682016"
                target="_blank"
                rel="noreferrer"
              >
                Coir House, Coir Board, M.G. Road, Kochi, Kerala, 682 016
              </a>
            </li>
            <li>
              <BiPhoneCall aria-hidden />
              <span>
                <a href="tel:+04842351900">0484-2351900</a>
                <a href="tel:+04842370034">0484-2370034</a>
              </span>
            </li>
            <li>
              <BiEnvelope aria-hidden />
              <a href="mailto:info@coirboard.org">info@coirboard.org</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright © Coirboard All Rights Reserved Designed & Maintained by
          Coir Board. Hosted by{" "}
          <a href="http://www.nic.in/" target="_blank" rel="noreferrer">
            National Informatics Centre.
          </a>
        </p>
      </div>
    </footer>
  );
}
