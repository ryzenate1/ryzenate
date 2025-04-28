import React from 'react';
import { motion } from 'framer-motion';
// Changed import to import all icons
import * as FaIcons from 'react-icons/fa';
import SectionTitle from '../Common/SectionTitle';

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = ({ id }) => {
  const phoneNumber = "7200672127";
  const emailAddress = "ryzenate72@gmail.com";

  return (
    <section
      id={id}
      data-scroll-section
      className="py-24 px-6 bg-[#0d1117] relative overflow-hidden"
    >
      {/* Animated Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <SectionTitle
          label="CONTACT"
          title="Got a problem to solve? Or have a request?"
          subtitle="Get your space suit ready and tell us your ideas to develop your dream web solution."
        />

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-14">
          {/* Phone Card */}
          <motion.a
            href={`tel:${phoneNumber}`}
            whileHover={{ scale: 1.1 }}
            className="relative group bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4 transition-transform duration-300 hover:shadow-xl hover:shadow-blue-400/30"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3 rounded-full bg-blue-500/20"
            >
              {/* Updated usage */}
              <FaIcons.FaPhoneAlt className="text-blue-400 text-2xl" />
            </motion.div>
            <span className="text-neutral-200 font-semibold text-lg">{phoneNumber}</span>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-10 transition duration-300" />
          </motion.a>

          {/* Email Card */}
          <motion.a
            href={`mailto:${emailAddress}`}
            whileHover={{ scale: 1.1 }}
            className="relative group bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4 transition-transform duration-300 hover:shadow-xl hover:shadow-blue-400/30"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3 rounded-full bg-blue-500/20"
            >
              {/* Updated usage */}
              <FaIcons.FaEnvelope className="text-blue-400 text-2xl" />
            </motion.div>
            <span className="text-neutral-200 font-semibold text-lg">{emailAddress}</span>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-10 transition duration-300" />
          </motion.a>
        </div>
      </motion.div>

      {/* Decorative Circles Background */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
    </section>
  );
};

export default Contact;
