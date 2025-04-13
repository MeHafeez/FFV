import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "../../App.css";
import vegetablesImage from "../../public/vegetables.png";

const Content = () => {
  const history = useHistory();
  const [isH1Animated, setIsH1Animated] = useState(false);

  useEffect(() => {
    const title = document.querySelector(".title");
    title.classList.add("animate-slide-in");

    title.addEventListener("animationend", () => {
      setIsH1Animated(true);
    });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-8 md:py-0">
      <div className="max-w-6xl w-full flex flex-col items-center md:items-start md:flex-row justify-between gap-8 md:gap-16">
        <div className="flex-1 mt-12 text-white text-center md:text-left">
          <h1 className="text-5xl font-semibold sm:text-6xl md:text-6xl lg:text-7xl title mb-8">
            Farm Fresh Vegetables
          </h1>
          {isH1Animated && (
            <>
              <p className="text-lg sm:text-xl md:text-2xl paragraph animate-slide-in mb-8">
                Experience the garden-fresh difference! We partner directly with local 
                farmers to bring you premium, hand-picked vegetables. From farm to 
                your table within 24 hours, ensuring maximum freshness, superior taste, 
                and the highest nutritional value. Support local farmers while enjoying 
                A1 quality produce at fair prices.
              </p>
              <button
               className="text-lg sm:text-xl border rounded-full px-10 py-4 explore-btn animate-pulse mx-auto md:mx-0"
               onClick={() => history.push('/shop')}
               >
                Explore Fresh Produce
              </button>
            </>
          )}
        </div>

        <div className="flex-1 flex justify-center hidden md:block">
          {/* <img
            src={vegetablesImage}
            alt="Fresh Vegetables"
            className="max-w-full h-auto animate-fade-in"
            style={{ maxHeight: "500px" }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Content;
