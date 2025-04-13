import React, { useEffect, useState, useRef } from 'react';
import { aboutUsData } from '../../data/mockData';

const AboutUs = () => {
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const { hero, mission, images, qualityPromise, process, stats } = aboutUsData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            if (!animatedSections.has(section)) {
              animatedSections.add(section);
              setAnimatedSections(new Set(animatedSections));
              section.classList.add("animate-fadeIn");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [animatedSections]);

  // Add animation classes to sections
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div 
          ref={el => sectionRefs.current[0] = el}
          className="text-center mb-16 opacity-0"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{hero.title}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {hero.description}
          </p>
        </div>

        {/* Mission Section */}
        <div 
          ref={el => sectionRefs.current[1] = el}
          className="grid md:grid-cols-2 gap-12 items-center mb-20 opacity-0"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-green-500">{mission.title}</h2>
            <p className="text-gray-400 text-lg">{mission.description}</p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src={images.farmImage}
              alt="Farm Partnership" 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Quality Assurance */}
        <div 
          ref={el => sectionRefs.current[2] = el}
          className="bg-gray-900 rounded-2xl p-8 mb-20 opacity-0"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">{qualityPromise.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {qualityPromise.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div 
          ref={el => sectionRefs.current[3] = el}
          className="space-y-16 mb-20 opacity-0"
        >
          <h2 className="text-3xl font-semibold text-center mb-12">{process.title}</h2>
          {process.steps.map((step, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
              {index % 2 === 0 ? (
                <>
                  <img 
                    src={images[step.image]}
                    alt={step.title} 
                    className="rounded-lg w-full h-[300px] object-cover"
                  />
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-green-500">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4 order-2 md:order-1">
                    <h3 className="text-2xl font-semibold text-green-500">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  <img 
                    src={images[step.image]}
                    alt={step.title} 
                    className="rounded-lg w-full h-[300px] object-cover order-1 md:order-2"
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div 
          ref={el => sectionRefs.current[4] = el}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20 opacity-0"
        >
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-green-500">{stat.value}</h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
