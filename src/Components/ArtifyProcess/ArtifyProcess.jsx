import React from "react";

const processSteps = [
  {
    number: "01",
    title: "Discover Art",
    description:
      "Browse thousands of original works by independent artists. Filter by style, medium, size, and price to find the perfect piece.",
  },
  {
    number: "02",
    title: "Connect Directly",
    description:
      "Reach out to the artist, learn the story behind each piece, and build real relationships with the creators you love.",
  },
  {
    number: "03",
    title: "Buy Securely",
    description:
      "Purchase with confidence using our secure checkout. Every transaction is protected with buyer guarantee and insured shipping.",
  },
  {
    number: "04",
    title: "Enjoy Your Art",
    description:
      "Your artwork arrives carefully packaged with a certificate of authenticity. Need help hanging? We offer virtual installation support.",
  },
];

const ArtifyProcess = () => {
  return (
    <section className="bg-[#17100c] px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1764px]">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-3 text-[#d99a00]">
            <span className="h-px w-8 bg-[#d99a00]" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em]">
              Simple Process
            </span>
          </div>

          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            How Artify Works
          </h2>
        </div>

        <div className="grid bg-[#f8f8f6] text-[#0d0907] md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className={`min-h-[350px] px-10 py-16 md:px-12 lg:px-14 ${
                index > 0 ? "xl:border-l xl:border-[#1a1410]" : ""
              } ${index % 2 === 1 ? "md:border-l md:border-[#1a1410] xl:border-l" : ""} ${
                index > 1 ? "md:border-t md:border-[#1a1410] xl:border-t-0" : ""
              }`}
            >
              <div className="font-serif text-5xl font-semibold leading-none text-[#f1dfbb]">
                {step.number}
              </div>
              <h3 className="mt-7 font-serif text-2xl leading-tight">
                {step.title}
              </h3>
              <p className="mt-5 max-w-[340px] text-base leading-8 text-[#6f5f57]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtifyProcess;
