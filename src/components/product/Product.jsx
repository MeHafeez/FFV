import { useEffect, useState } from "react";
import "../../App.css";

const Product = () => {
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const image = document.getElementById("product-image");
      const rect = image.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setImageVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="p-6 sm:p-12 lg:p-24 flex flex-col lg:flex-row gap-4 text-gray-100 justify-center">
        <div className="flex flex-col gap-6 w-full max-w-xl" id="product-section">
          <section
            className={`flex gap-2 items-center transition-opacity duration-1000 ${
              imageVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-2 h-2 rounded-full transform transition-transform duration-500 hover:scale-150"
              style={{ background: "#22c55e" }}
            ></div>
            <p
              className="font-semibold text-lg transform transition-transform duration-500 hover:translate-x-2"
              style={{ color: "#22c55e" }}
            >
              Fresh & Healthy
            </p>
          </section>
          <div className="transition-transform duration-300 hover:translate-x-2">
            <h1
              style={{ color: "#fcf6f5" }}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-transform duration-1000 ${
                imageVisible ? "slide-in-left" : "opacity-0"
              }`}
            >
              Farm-Fresh Vegetables & Fruits
            </h1>
          </div>
          <div className="transition-transform duration-300 hover:translate-x-2">
            <p
              style={{ color: "#e7e8e1" }}
              className={`transition-opacity duration-1000 ${
                imageVisible ? "slide-in-left delay-500" : "opacity-0"
              }`}
            >
              Experience the finest selection of farm-fresh vegetables and fruits, 
              delivered straight from local farms to your table. Our produce is 
              carefully selected to ensure premium quality, maximum freshness, and 
              exceptional taste. We believe in supporting local farmers while 
              providing our customers with the healthiest and most delicious 
              organic options available.
            </p>
          </div>
        </div>
        <div className="relative flex-1 cursor-pointer transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-lg">
          <div
            className={`absolute inset-0 bg-white transition-opacity duration-1000 ${
              imageVisible ? "opacity-0" : "opacity-80"
            }`}
          ></div>
          <img
            id="product-image"
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
            alt="fresh-vegetables-display"
            className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-full max-w-2xl rounded-lg border transition-transform duration-500"
            style={{ borderColor: "#22c55e" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
