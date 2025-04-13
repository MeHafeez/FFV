import React, { useEffect, useRef, useState } from 'react';

const Slider = () => {
    const sectionsRef = useRef([]);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isTransitioning) return;

            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, isTransitioning]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const section = entry.target;

                    if (entry.isIntersecting) {
                        setIsTransitioning(true);
                        document.body.style.overflow = 'hidden';

                        if (scrollDirection === 'down') {
                            section.classList.add('h-auto');
                            section.classList.remove('h-10');
                        } else if (scrollDirection === 'up') {
                            section.classList.add('h-10');
                            section.classList.remove('h-auto');
                        }

                        setTimeout(() => {
                            setIsTransitioning(false);
                            document.body.style.overflow = 'auto'; 
                        }, 1000); 
                    }
                });
            },
            { threshold: 0.5 }
        );

        sectionsRef.current.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sectionsRef.current.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, [scrollDirection]);

    return (
        <div className="w-full flex flex-col">
            {['bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500'].map((bgColor, idx) => (
                <section
                    key={idx}
                    ref={(el) => (sectionsRef.current[idx] = el)}
                    className={`w-full flex justify-between ${bgColor} h-10 transition-all duration-1000 ease-in-out overflow-hidden`}
                >
                    <div className="w-full flex flex-col justify-between flex-1 p-4">
                        <h1>Header One</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odio culpa molestias amet,
                            quia asperiores, ea deserunt quo minus dolorem nihil possimus optio, veritatis facilis
                            tempora tenetur reprehenderit quibusdam cupiditate?
                        </p>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="https://www.webwerks.in/sites/default/files/inline-images/page-banner/services/backup-as-a-service-page-banner.jpg"
                            alt=""
                        />
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Slider;
