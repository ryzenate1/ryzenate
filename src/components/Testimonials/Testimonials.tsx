'use client';

import React, { useEffect } from 'react';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import { testimonials, TestimonialData } from '../../data/testimonials';
import SectionTitle from '../Common/SectionTitle';

const TestimonialCard: React.FC<{ testimonial: TestimonialData }> = ({ testimonial }) => (
  <div className="glass-container rounded-lg p-6 mx-2 sm:mx-3 md:mx-4 w-[85vw] sm:w-[75vw] md:w-80 h-48 flex flex-col justify-between flex-shrink-0">
    {testimonial.imageUrl && (
      <img 
        src={testimonial.imageUrl} 
        alt={`${testimonial.name} photo`} 
        className="w-12 h-12 rounded-full object-cover mb-3 border-2 border-neutral-600" 
      />
    )}
    <p className={`text-sm text-neutral-300 italic leading-snug ${testimonial.imageUrl ? '' : 'pt-4'}`}> 
      "{testimonial.quote}"
    </p>
    <div className="mt-3 text-right">
      <p className="text-sm font-semibold text-neutral-100">{testimonial.name}</p>
      <p className="text-xs text-neutral-400">{testimonial.role}</p> 
    </div>
  </div>
);

interface TestimonialsProps {
  id: string;
  onContentReady?: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ id, onContentReady }) => {
  const duplicatedTestimonials = testimonials.length > 0 
    ? [...testimonials, ...testimonials, ...testimonials] 
    : [];

  const mid = Math.ceil(duplicatedTestimonials.length / 2);
  const row1 = duplicatedTestimonials.slice(0, mid);
  const row2 = duplicatedTestimonials.slice(mid);

  useEffect(() => {
    if (onContentReady) {
      const timeoutId = setTimeout(() => {
        onContentReady();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [onContentReady]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section 
      id={id}
      data-scroll-section
      className="py-24 px-4 bg-cover bg-center overflow-hidden relative z-10"
      style={{ backgroundImage: `url('/projects/bg2.jpg')` }}
    >
      <SectionTitle 
        label="CUSTOMER STORIES"
        title="Trusted by the kindest clients"
        subtitle="Here's a glimpse into the heartfelt experiences of our incredible clients. Your trust fuels our passion."
      />

      <motion.div 
        className="relative flex flex-col gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Corrected gradientColor type to string */}
        <Marquee gradient={true} gradientColor="rgb(16, 20, 27)" speed={45} pauseOnHover={true}>
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${t.id}-${i}`} testimonial={t} />
          ))}
        </Marquee>

        {/* Corrected gradientColor type to string */}
        <Marquee gradient={true} gradientColor="rgb(16, 20, 27)" speed={40} direction="right" pauseOnHover={true}>
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${t.id}-${i}`} testimonial={t} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Testimonials;