import { TextField } from "@mui/material";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', 
    },
  },
});

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight - 100) {
        const elements = document.querySelectorAll('.footer-text-slide-in');
        elements.forEach(el => {
          el.classList.add('animate');
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="flex flex-col gap-12 px-6 py-8 bg-black text-white">
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <h1 className="text-2xl text-white footer-text-slide-in">Subscribe for Fresh Updates</h1>
          <div className="relative w-full md:w-80 footer-text-slide-in">
            <ThemeProvider theme={theme}>
              <TextField
                id="outlined-basic"
                label="Enter your email for weekly offers"
                variant="outlined"
                color="primary"
                className="w-full md:w-80"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', 
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', 
                    },
                    '& input': {
                      color: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white', 
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'white', 
                  },
                }}
              />
            </ThemeProvider>
          </div>
          <div className="social-media-card flex gap-4 footer-text-slide-in">
            <a className="socialContainer containerOne hover:text-green-400" href="#">
              <FaInstagram className="socialSvg instagramSvg text-white" />
            </a>
            <a className="socialContainer containerTwo hover:text-green-400" href="#">
              <FaTwitter className="socialSvg twitterSvg text-white" />
            </a>
            <a className="socialContainer containerThree hover:text-green-400" href="#">
              <FaLinkedin className="socialSvg linkedinSvg text-white" />
            </a>
            <a className="socialContainer containerFour hover:text-green-400" href="https://wa.me/916300797615">
              <FaWhatsapp className="socialSvg whatsappSvg text-white" />
            </a>
          </div>
        </div>

        <div className="flex gap-4 md:flex-nowrap md:gap-6 w-full md:w-1/2 justify-between">
          <section className="flex flex-col gap-4 w-full">
            <h3 className="text-green-500 font-semibold footer-text-slide-in">Quick Links</h3>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">About Us</a>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">Our Products</a>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">Contact</a>
          </section>
          <section className="flex flex-col gap-4 w-full">
            <h3 className="text-green-500 font-semibold footer-text-slide-in">Help</h3>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">Delivery Info</a>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">Return Policy</a>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">Terms of Service</a>
            <a href="#" className="hover:text-green-400 footer-text-slide-in">Privacy Policy</a>
          </section>
          <section className="w-full hidden md:flex flex-col gap-2">
            <h3 className="text-green-500 font-semibold footer-text-slide-in">Contact Us</h3>
            <p className="text-white footer-text-slide-in">Fresh Market</p>
            {/* <p className="text-white footer-text-slide-in">123 Fresh Market Street, Farmville, FL 12345</p> */}
            <p className="text-white footer-text-slide-in">Phone: +91 6300797615</p>
            <p className="text-white footer-text-slide-in">WhatsApp: +91 6300797615</p>
          </section>
        </div>
      </section>
      <section className="p-2 md:p-4 flex items-center justify-center">
        <p className="text-gray-400 footer-text-slide-in">&copy;2025 Fresh Market. All rights reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
