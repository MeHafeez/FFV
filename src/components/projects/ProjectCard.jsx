import { useState, useEffect, useRef } from "react";
import { projectCardData } from "../../data/mockData";
import "../../App.css";

const ProjectCards = ({ showSideTitle = false, title, maxCards }) => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            if (!animatedCards.has(card)) {
              animatedCards.add(card);
              setAnimatedCards(new Set(animatedCards));
              card.classList.add("animate-fadeIn");
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [animatedCards]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setAnimatedCards(new Set());
    cardsRef.current = [];
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setAnimatedCards(new Set());
    cardsRef.current = [];
  };

  const displayedCards = projectCardData
    .filter((card) => {
      const matchesSearch = !searchTerm.trim() || 
        card.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const matchesCategory = selectedCategory === "all" || 
        card.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, maxCards || projectCardData.length);

  return (
    <main className="py-4 min-h-screen flex flex-col items-center" style={{ backgroundColor: "black" }}>
      <div className="w-full max-w-7xl px-4">
        {showSideTitle && (
          <section className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#fcf6f5" }}
            ></div>
            <h1 className="text-lg font-semibold" style={{ color: "#fcf6f5" }}>
              {title || "Our Products"}
            </h1>
          </section>
        )}

        <div className="mb-6 w-full space-y-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500"
          />
          
          <div className="flex gap-3">
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === "all"
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryFilter("vegetables")}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === "vegetables"
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Vegetables
            </button>
            <button
              onClick={() => handleCategoryFilter("fruits")}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === "fruits"
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Fruits
            </button>
            <button
              onClick={() => handleCategoryFilter("dairy")}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === "dairy"
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Dairy
            </button>
          </div>
        </div>

        <section className="flex flex-wrap gap-8 justify-start w-full">
          {displayedCards.map((obj, idx) => (
            <section
              key={idx}
              className="hover:cursor-pointer hover:-translate-y-2 hover:transition-all hover:shadow-xl hover:duration-500"
            >
              <div
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`card border-css w-full md:w-96`}
              >
                <div className="card-content">
                  <div className="w-full h-64">
                    <img
                      className={`w-full h-full object-cover
                        ${
                          animatedCards.has(cardsRef.current[idx])
                            ? "animate-fadeInImage"
                            : ""
                        }`}
                      src={obj.projectImg}
                      alt="project-img"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-4 items-center justify-center">
                    <h1
                      className="font-bold text-lg"
                      style={{ color: "#fcf6f5" }}
                    >
                      {obj.title}
                    </h1>
                    <p style={{ color: "#e7e8e1" }}>{obj.price}</p>
                    <button 
                      className={`text-lg sm:text-xl border rounded-full px-10 w-48 explore-btn animate-pulse mx-auto md:mx-0`}
                      style={{ 
                        backgroundColor: obj.available === "yes" ? "#22c55e" : "#ef4444",
                        borderColor: obj.available === "yes" ? "#22c55e" : "#ef4444"
                      }}
                    >
                      {obj.available === "yes" ? "Available" : "Available Soon"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ProjectCards;
