import { useEffect, useRef, useState } from "react";
import { whyChooseUsData } from "../../data/mockData";
import "../../App.css";

const WhyChooseUs = () => {
  const cardsRef = useRef([]);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            const overlay = entry.target.querySelector(".image-overlay");
            const image = entry.target.querySelector(".image-element");
            if (overlay) {
              overlay.classList.add("animate-reveal");
            }
            if (image) {
              image.classList.add("animate-fade-in");
            }
            entry.target.classList.add("animate-slide-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <main className="py-6 px-6 bg-black rounded-b-3xl max-w-7xl mx-auto">
      <h4
        className="font-semibold text-lg flex items-center mt-4 gap-2"
        style={{ color: "#22c55e" }}
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{ background: "#22c55e" }}
        ></div>
        Why Choose Us
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 py-4 px-2 relative">
        {whyChooseUsData.map((cardDetails, idx) => (
          <div
            className={`flex flex-col items-center w-full max-w-5xl card-container-small`}
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
          >
            <section className="w-full md:w-[35rem] h-64 md:h-80 relative overflow-hidden rounded-lg hover:cursor-pointer hover:-translate-y-2 hover:duration-500 mb-6">
              <div className="gradient-border absolute inset-0 rounded-lg border-green-500"></div>
              <div
                className="image-container absolute inset-0 w-full h-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url("${cardDetails.thumbnail}")`,
                }}
              >
                <div className="image-overlay"></div>
                <img
                  className="image-element absolute inset-0 w-full h-full bg-cover bg-center rounded-lg"
                  src={cardDetails.thumbnail}
                  alt={cardDetails.title}
                />
              </div>
              <h1 className="text-white text-center text-lg absolute bottom-0 font-semibold w-full bg-green-900 bg-opacity-80 p-3 rounded relative z-10">
                {cardDetails.title}
              </h1>
            </section>

            <section className="flex flex-col gap-4 md:gap-7 p-4 md:p-6 w-full">
              <h1
                style={{ color: "#22c55e" }}
                className="text-2xl text-center md:text-3xl font-bold pb-2 hover:-translate-x-2 hover:duration-500"
              >
                {cardDetails.title}
              </h1>
              <p
                className="text-center hover:translate-x-2 hover:duration-500"
                style={{ color: "#e7e8e1" }}
              >
                {cardDetails.description}
              </p>
            </section>
          </div>
        ))}
      </div>
    </main>
  );
};

export default WhyChooseUs;
