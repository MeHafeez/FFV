import "../../App.css";
import React from "react";
import Header from "../../components/banner/Header";
import VideoBanner from "../../components/banner/Banner";
import Product from "../../components/product/Product";
import ServiceCards from "../../components/services/ServiceCard";
import Footer from "../../components/footer/Footer";
import ProjectCards from "../../components/projects/ProjectCard";
import WhatsAppOrder from '../../components/whatsapp/WhatsAppOrder';


const LandingPage = () => {
  return (
    <div className="h-full overflow-hidden">
      {/* <Header /> */}
      <VideoBanner />
      <Product />
      <ServiceCards />
      {/* <ProjectCards showSideTitle={true} maxCards={6} /> */}
      <WhatsAppOrder />

      <Footer />
    </div>
  );
};

export default LandingPage;
