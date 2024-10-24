import React from "react";
import { motion } from "framer-motion";

const logos = [
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/lavazza.svg",
    alt: "Lavazza",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/pizza-hut-1.svg",
    alt: "Pizza Hut",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/toolstation.svg",
    alt: "Toolstation",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/navya.svg",
    alt: "Navya",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/gl-events.svg",
    alt: "GL Events",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/airfrance.svg",
    alt: "Air France",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/bayer.svg",
    alt: "Bayer",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/em.svg",
    alt: "emlyon Business School",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/10/subway.svg",
    alt: "Subway",
  },
  {
    src: "https://digital-cover.com/wp-content/uploads/2022/05/ol.svg",
    alt: "Olympique Lyonnais",
  },
];

const TrustedBySection = () => {
  return (
    <div className="bg-black text-white py-16">
      <h2 className="text-center text-4xl font-semibold mb-12 uppercase custom-stroke">
        TRUST BUILD
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="h-28 cursor-pointer "
            drag
            dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrustedBySection;
