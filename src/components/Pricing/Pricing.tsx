import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import SectionTitle from '../Common/SectionTitle';
// Import Font Awesome icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PricingPlanProps {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
  isCustom?: boolean;
  // Add the new prop for the click handler
  onGetStartedClick: (plan: PricingPlanProps) => void;
}

// Pricing Plan Card Component
// Destructure the new prop
const PricingPlan: React.FC<PricingPlanProps> = ({ title, price, features, highlight, isCustom, onGetStartedClick }) => {
  // Modify the click handler to call the passed function
  const handleGetStartedClick = () => {
    onGetStartedClick({
      title, price, features, highlight, isCustom,
      onGetStartedClick: function (plan: PricingPlanProps): void {
        throw new Error('Function not implemented.');
      }
    });
  };

  return (
    <motion.div
      // Added h-full to ensure cards take full height of the slide container
      className={`glass-container rounded-lg p-6 md:p-8 mx-2 h-full flex flex-col ${highlight ? 'border-2 border-blue-500 shadow-blue-500/20' : ''}`}
      initial={{ opacity: 0, y: 30 }} // Initial state (hidden and slightly down)
      whileInView={{ opacity: 1, y: 0 }} // Animate to (visible and original position) when in view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of element is in view, only once
      transition={{ duration: 0.6 }} // Animation duration
    >
      <h3 className="text-lg md:text-xl font-semibold text-neutral-100 mb-3 md:mb-4">{title}</h3>
      <p className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-neutral-200">{price}</p>
      <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow text-sm md:text-base">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-neutral-300">
            {/* <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /> */}
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        className="mt-auto w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        onClick={handleGetStartedClick} // Use the modified handler
      >
        {isCustom ? 'Contact Me' : 'Get Started'}
      </button>
    </motion.div>
  );
};

// Custom Arrow Components - Wrapping icon in a div (as per our last working version)
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className} // Pass className from slick
      style={{ ...style, display: "block" }} // Pass style from slick
      onClick={onClick} // Pass onClick from slick
    >
      <span className="text-white/70 hover:text-white z-10 cursor-pointer" style={{ width: '28px', height: '28px' }}><FaArrowLeft /></span>{/* Wrapped icon in span */}

    </div>
  );
}

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
       <span className="text-white/70 hover:text-white z-10 cursor-pointer" style={{ width: '28px', height: '28px' }}><FaArrowRight /></span>{/* Wrapped icon in span */}

    </div>
  );
}

// Accept id prop
const Pricing: React.FC<{ id: string }> = ({ id }) => {
  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlanProps | null>(null);

  // Function to open the modal
  const openModal = (plan: PricingPlanProps) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPlan(null);
    setShowModal(false);
  };

  // Function to handle contact choice from modal
  const handleContactChoice = (method: 'call' | 'email') => {
    if (selectedPlan) {
      if (method === 'call') {
        window.location.href = 'tel:7200672127'; // Updated with user's phone number
      } else {
        window.location.href = `mailto:ryzenate72@gmail.com?subject=Inquiry about ${encodeURIComponent(selectedPlan.title)}`; // Updated with user's email
      }
    }
    closeModal();
  };

  const plans: PricingPlanProps[] = [
    {
      title: "Digitalization Starter",
      price: "3000rs", // Updated price
      features: [
        "Google Business Management (Digitalization)",
        "General Consultancy (Based on shop/location)",
      ],
      onGetStartedClick: function (plan: PricingPlanProps): void {
        throw new Error('Function not implemented.');
      }
    },
    {
      title: "Digitalization Intermediate",
      price: "₹3,000 - ₹12,000",
      features: [
        "Fully Functional Website (within a week)",
        "Customized Domain + SSL (1yr Free)",
        "Google Business Management",
        "SEO & Follow-ups",
        "General Consultancy",
      ],
      highlight: true,
      onGetStartedClick: function (plan: PricingPlanProps): void {
        throw new Error('Function not implemented.');
      }
    },
    {
      title: "Digitalization Advanced",
      price: "Starting from ₹12,000",
      features: [
        "Fully Functional Website (within a week)",
        "Customized Domain + SSL (1yr Free)",
        "Google Business Management",
        "Advanced SEO",
        "Database Management",
        "Reviews Management",
        "General Consultancy",
        "Unlimited Customized Logo/Banner Designing",
      ],
      onGetStartedClick: function (plan: PricingPlanProps): void {
        throw new Error('Function not implemented.');
      }
    },
    {
      title: "Customized Plan",
      price: "Tailored Pricing",
      features: [
        "Bespoke solutions to fit your unique needs",
        "Scalable features and services",
        "Dedicated consultation",
        "Flexible pricing based on requirements",
      ],
      isCustom: true,
      onGetStartedClick: function (plan: PricingPlanProps): void {
        throw new Error('Function not implemented.');
      }
    },
  ];

  // Re-implementing slider settings from our previous iteration
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    appendDots: (dots: React.ReactNode) => (
        <div style={{ position: 'absolute', bottom: '-40px' }}>
            <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-gray-600 active:bg-blue-500 transition-colors duration-200 mx-1"></div>
    ),
    className: "slick-track-equal-height" // Class for CSS overrides
  };

  return (
    <section
      id={id} // Use passed id
      data-scroll-section // Add data-scroll-section here
      className="py-20 px-4 bg-cover bg-center relative overflow-hidden pb-24" // Added padding-bottom for dots
      // Using bgspace.webp as discussed earlier
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/projects/bgspace.webp'})` }}
    >
      <SectionTitle
        label="SERVICES"
        title="Launching visions, building websites"
        subtitle="Secure your seat, fasten your seatbelt, and join us on an interstellar journey to turn your web vision into a next level reality."
      />

      {/* Wrapper div for the slider with relative positioning and padding */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-12 relative">
        <Slider {...sliderSettings}>
          {plans.map((plan, index) => (
            // Container for each slide card
            <div key={index} className="p-2 h-full">
              {/* Pass the openModal function */} {/* Corrected prop name */}
              <PricingPlan {...plan} onGetStartedClick={openModal} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="glass-container rounded-lg p-6 md:p-8 mx-4 max-w-sm w-full text-neutral-100">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Contact for {selectedPlan.title}</h3>
            <p className="mb-6">How would you like to get in touch?</p>
            <div className="flex justify-around space-x-4">
              <button
                className="flex-1 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                onClick={() => handleContactChoice('call')}
              >
                Call
              </button>
              <button
                className="flex-1 py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                onClick={() => handleContactChoice('email')}
              >
                Email
              </button>
            </div>
            <p className="text-sm text-neutral-400 mt-4 text-center">Terms and conditions apply</p>
            <button
              className="mt-6 w-full py-2 px-4 rounded-md bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-colors"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
