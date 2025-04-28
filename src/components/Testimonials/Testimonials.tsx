"use client";
import React, { useEffect } from 'react'; // Import useEffect
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import { testimonials, TestimonialData } from '../../data/testimonials';
import SectionTitle from '../Common/SectionTitle'; // Import SectionTitle

// Testimonial Card Component - Updated width and margin classes
const TestimonialCard: React.FC<{ testimonial: TestimonialData }> = ({ testimonial }) => (
  // Adjusted width using vw for better mobile scaling, adjusted margins
  <div className="glass-container rounded-lg p-6 mx-2 sm:mx-3 md:mx-4 w-[85vw] sm:w-[75vw] md:w-80 h-48 flex flex-col justify-between flex-shrink-0"> {/* Increased height slightly, added flex-shrink-0 */}
    {/* Optional Image - Add if imageUrl exists */}
    {testimonial.imageUrl && (
        <img 
            src={testimonial.imageUrl} 
            alt={`${testimonial.name} photo`} 
            className="w-12 h-12 rounded-full object-cover mb-3 border-2 border-neutral-600" 
        />
    )}
    {/* Adjusted padding based on image presence */}
    <p className={`text-sm text-neutral-300 italic leading-snug ${testimonial.imageUrl ? '' : 'pt-4'}`}> 
        "{testimonial.quote}"
    </p>
    <div className="mt-3 text-right">
      <p className="text-sm font-semibold text-neutral-100">{testimonial.name}</p>
      <p className="text-xs text-neutral-400">{testimonial.role}</p> 
    </div>
  </div>
);

// Accept onContentReady prop and id
const Testimonials: React.FC<{ id: string; onContentReady?: () => void }> = ({ id, onContentReady }) => {
    
    // Duplicate testimonials for continuous effect, ensure odd/even split for rows
    const duplicatedTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials, ...testimonials] : []; // Duplicate more for smoother loop
    const mid = Math.ceil(duplicatedTestimonials.length / 2);
    const row1 = duplicatedTestimonials.slice(0, mid);
    const row2 = duplicatedTestimonials.slice(mid);

    // Call onContentReady after the component mounts
    useEffect(() => {
        if (onContentReady) {
            const timeoutId = setTimeout(() => {
                onContentReady();
            }, 500); // Reduced delay as this doesn't load heavy resources
            return () => clearTimeout(timeoutId);
        }
    }, [onContentReady]);

    if (testimonials.length === 0) {
        return null; 
    }

    return (
        <section 
          id={id} // Use passed id
          data-scroll-section // Add data-scroll-section here
          className="py-24 px-4 bg-cover bg-center overflow-hidden relative z-10"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/projects/bg2.jpg'})` }} // Added background image
        >
        {/* Section Title Component */}
        <SectionTitle 
          label="CUSTOMER STORIES"
          title="Trusted by the kindest clients"
          subtitle="Here's a glimpse into the heartfelt experiences of our incredible clients. Your trust fuels our passion."
        />
        
        {/* Testimonials Content Wrapper - Added Framer Motion whileInView animation */}
        <motion.div 
            className="relative flex flex-col gap-8"
            initial={{ opacity: 0, y: 50 }} // Start slightly below and invisible
            whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up to position
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of this div is in view
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Marquee Row 1 */}
            <Marquee gradient={true} gradientColor={[16, 20, 27, 0.5]} speed={45} pauseOnHover={true}> 
                {row1.map((t, i) => <TestimonialCard key={`${t.id}-r1-${i}`} testimonial={t} />)}
            </Marquee>
            {/* Marquee Row 2 */}
            <Marquee gradient={true} gradientColor={[16, 20, 27, 0.5]} speed={40} direction="right" pauseOnHover={true}> 
                {row2.map((t, i) => <TestimonialCard key={`${t.id}-r2-${i}`} testimonial={t} />)}
            </Marquee>
        </motion.div>
        </section>
    );
};

export default Testimonials;
