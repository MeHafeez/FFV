import { Button } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';
import { contactData } from '../../data/mockData';
import { useEffect, useRef, useState } from 'react';

const WhatsAppOrder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! 👋 I'm interested in ordering fresh produce from Fresh Market. Could you please help me with today's available items and prices? Thank you! 🥬🥕"
    );
    window.open(`https://wa.me/${contactData.whatsapp.number}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-black py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`bg-green-900/30 rounded-xl p-8 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center">
            <h2 className={`text-2xl font-semibold mb-4 text-white transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              {contactData.whatsapp.title}
            </h2>
            <p className={`text-gray-400 mb-6 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              {contactData.whatsapp.description}
            </p>
            <Button
              variant="contained"
              startIcon={<FaWhatsapp className="w-5 h-5" />}
              onClick={handleWhatsAppClick}
              className={`transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              sx={{
                backgroundColor: '#25D366',
                '&:hover': { backgroundColor: '#128C7E' },
                py: 1.5,
                px: 4
              }}
            >
              {contactData.whatsapp.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppOrder;