import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
const LINKS = {
  Links: ["About Us", "Contact", "Blog", "Help Center"],
  "About Us": ["Our story", "Our customers", "Careers", "Blog"],
  Support: ["Contact us", "Developer story", "Help center"],
};

const SOCIAL = [
  { icon: FaXTwitter, label: "Twitter" },
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaInstagram, label: "Instagram" },
  // { icon: FaYoutube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#0f0f1f] text-white/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-white font-bold text-lg mb-1">
              exo<span className="text-[#4ecdc4]">connect</span>
            </p>
            <p className="text-xs leading-relaxed max-w-xs mt-3">
              Secure beauty clarity text to the printing and typesetting
              industry.
            </p>
            <div className="flex items-center gap-2 mt-5 max-w-xs">
              <input
                type="email"
                placeholder="Hire example@shiny.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#4ecdc4]"
              />
              <button
                type="button"
                className="bg-[#4ecdc4] text-black text-xs font-semibold px-3 py-2 rounded-md hover:bg-[#3dbdb4] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© Copyright 2024. All rights reserved</p>
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
