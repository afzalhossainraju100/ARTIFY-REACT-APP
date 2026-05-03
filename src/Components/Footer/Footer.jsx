import React from "react";

const SocialSquare = ({ children, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 border border-[rgba(255,255,255,0.04)] inline-flex items-center justify-center mr-3 text-[#c8b7aa] no-underline bg-transparent"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-[#1b1917] text-[#c8b7aa]">
      <div className="max-w-[1180px] mx-auto px-5 py-14">
        <div className="flex gap-10 items-start flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <div className="text-[34px] font-bold tracking-wide font-serif">
              <span className="text-white">ART</span>
              <span className="ml-2 text-[#f2b342]">IFY</span>
            </div>
            <p className="mt-4 text-[#a9998f] max-w-[360px] leading-7">
              The marketplace where art finds its home. Supporting artists.
              Enriching spaces. Building culture.
            </p>

            <div className="mt-6 flex items-center">
              <SocialSquare
                href="https://www.linkedin.com/in/afzal-hossain-raju/"
                label="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.56V24H.22V8.98zM8.5 8.98h4.38v2.07h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-7.25c0-1.73-.03-3.95-2.41-3.95-2.41 0-2.78 1.88-2.78 3.82V24H8.5V8.98z"
                    fill="#c8b7aa"
                  />
                </svg>
              </SocialSquare>

              <SocialSquare
                href="https://web.facebook.com/mmafzal.raju"
                label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56V12h2.74l-.44 2.89h-2.3v6.99C18.34 21.12 22 17 22 12z"
                    fill="#c8b7aa"
                  />
                </svg>
              </SocialSquare>
            </div>
          </div>

          <div className="flex gap-8 flex-[2_1_600px] flex-wrap">
            <div className="min-w-[160px]">
              <div className="text-[12px] text-[#e6b65a] tracking-wider mb-3">
                EXPLORE
              </div>
              <ul className="list-none p-0 m-0 text-[#bfb3a8] leading-9">
                <li>All Artworks</li>
                <li>Collections</li>
              </ul>
            </div>

            <div className="min-w-[160px]">
              <div className="text-[12px] text-[#e6b65a] tracking-wider mb-3">
                FOR ARTISTS
              </div>
              <ul className="list-none p-0 m-0 text-[#bfb3a8] leading-9">
                <li>Start Selling</li>
                <li>Pricing & Fees</li>
              </ul>
            </div>

            <div className="min-w-[160px]">
              <div className="text-[12px] text-[#e6b65a] tracking-wider mb-3">
                COMPANY
              </div>
              <ul className="list-none p-0 m-0 text-[#bfb3a8] leading-9">
                <li>About Artify</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.03)] mt-9 pt-5 flex justify-between items-center">
          <div className="text-[#8d7b6f] text-sm">
            © 2025 Artify Ltd. All rights reserved.
          </div>
          <div className="text-[#8d7b6f] text-sm">
            Designed with care for artists everywhere.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
