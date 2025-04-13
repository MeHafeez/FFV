import React from "react";
import Content from "./Content";

const VideoBanner = () => {
  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0c172b" }}
    >
      <div
        className="max-w-full max-h-full transform scale-110"
        style={{
          backgroundImage:
            'url("https://static.wixstatic.com/media/913019_4ad1a433891b4dfe827c2b574e39a6f9~mv2_d_7132_4238_s_4_2.jpg/v1/fill/w_1898,h_1250,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/913019_4ad1a433891b4dfe827c2b574e39a6f9~mv2_d_7132_4238_s_4_2.jpg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "1898px",
          height: "1250px",
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Content />
      </div>
    </div>
  );
};

export default VideoBanner;

