import { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Alert } from '@mui/material';
import { contactData } from '../../data/mockData';
import { FaWhatsapp } from 'react-icons/fa';


const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .test('no-yopmail', 'Please use a valid email domain', (value) => {
      if (!value) return true; 
      return !value.toLowerCase().includes('yopmail.com');
    }),
  message: Yup.string()
    .min(10, 'Message is too short')
    .required('Message is required'),
});

const ContactUs = () => {
  const [animatedSections, setAnimatedSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Handle form submission here
      console.log('Form values:', values);
      setSubmitStatus('success');
      resetForm();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    }
  };

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
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [animatedSections]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contactData.whatsapp.number}?text=Hello, I would like to place an order.`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div ref={el => sectionRefs.current[0] = el} className="text-center mb-12 opacity-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{contactData.hero.title}</h1>
          <p className="text-gray-400 text-lg">{contactData.hero.description}</p>
        </div>

        {/* WhatsApp Section */}
        <div ref={el => sectionRefs.current[1] = el} className="bg-green-900/30 rounded-xl p-8 mb-12 opacity-0">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{contactData.whatsapp.title}</h2>
            <p className="text-gray-400 mb-6">{contactData.whatsapp.description}</p>
            <Button
              variant="contained"
              startIcon={<FaWhatsapp className="w-5 h-5" />}
              onClick={handleWhatsAppClick}
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

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div ref={el => sectionRefs.current[2] = el} className="bg-gray-900 p-8 rounded-lg opacity-0">
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form className="space-y-6">
                  {submitStatus === 'success' && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Message sent successfully!
                    </Alert>
                  )}
                  {submitStatus === 'error' && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Failed to send message. Please try again.
                    </Alert>
                  )}

                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiFormHelperText-root': { color: '#f44336' }
                    }}
                  />

                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiFormHelperText-root': { color: '#f44336' }
                    }}
                  />

                  <TextField
                    fullWidth
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiFormHelperText-root': { color: '#f44336' }
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#22c55e',
                      '&:hover': { backgroundColor: '#16a34a' },
                      py: 1.5
                    }}
                  >
                    Send Message
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Keep existing contact information section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {/* <div>
                  <h3 className="text-green-500 font-medium mb-1">Address</h3>
                  <p className="text-gray-400">123 Fresh Market Street, Farmville, FL 12345</p>
                </div> */}
                <div>
                  <h3 className="text-green-500 font-medium mb-1">Phone</h3>
                  <p className="text-gray-400">+91 6300797615</p>
                </div>
                <div>
                  <h3 className="text-green-500 font-medium mb-1">Email</h3>
                  <p className="text-gray-400">contact@freshveggies.com</p>
                </div>
                <div>
                  <h3 className="text-green-500 font-medium mb-1">Business Hours</h3>
                  <p className="text-gray-400">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-400">Sunday: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <ul className="space-y-3 text-gray-400">
                <li>✓ Direct partnership with local farmers</li>
                <li>✓ Same-day harvest delivery</li>
                <li>✓ Premium quality guarantee</li>
                <li>✓ Sustainable farming practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
