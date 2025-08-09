import Logo from "../../public/blue-vocalize-logo.svg";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io5";

const footerColumns = [
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Vocalize",
    links: [
      { label: "AI Vocalizer", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Library", href: "#" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Legal", href: "#" },
];

const socialMedia = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: SiInstagram, href: "#" },
  { icon: IoLogoYoutube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#252525] text-[#F4F4F4]">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Vocalize logo" className="w-22 h-22" />
              <div>
                <div className="text-2xl sm:text-3xl leading-none">
                  <span className="font-bold font-montserrat text-professional-song">
                    Vocalize
                  </span>
                </div>
                <div className="text-sm text-white/80 mt-1">
                  Unleash Your Inner Singer.
                </div>
              </div>
            </div>

            <p className="mt-2 max-w-sm text-sm sm:text-lg font-normal text-[#f4f4f4] opacity-65">
              Get instant AI mixing &amp; mastering for your dream vocals.{" "}
              <span className="font-bold text-[#f4f4f4] ">
                Fast. Easy. Flawless.
              </span>
            </p>

            <div className="mt-6 flex items-center gap-7">
              {socialMedia.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/90 hover:text-white transition-colors"
                  aria-label="social link"
                >
                  <Icon className="h-7 w-7 hover:text-blue-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {col.title}
                </h3>
                {col.title === "Vocalize" ? (
                  <ul className="grid grid-cols-2 gap-y-3">
                    {col.links.map((l) => (
                      <li key={l.label} className="w-fit">
                        <a
                          href={l.href}
                          className="inline-block text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label} className="w-fit">
                        <a
                          href={l.href}
                          className="inline-block text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-white/70 md:flex-row">
          <p className="font-montserrat text-[#f4f4f4] leading-normal">
            ©2025-2030 Vocalize, Corp. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            {bottomLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:text-white text-[#f4f4f4] leading-normal"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
