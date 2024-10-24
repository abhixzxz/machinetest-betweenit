import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const AvoidingBanner = () => {
  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);


  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bannerRef.current || !textRef.current) return;

      // Get banner and text boundaries
      const bannerRect = bannerRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      // Calculate relative mouse position within banner
      const relativeX = e.clientX - bannerRect.left;
      const relativeY = e.clientY - bannerRect.top;

      // Calculate text center position
      const textCenterX = textRect.left + textRect.width / 2 - bannerRect.left;
      const textCenterY = textRect.top + textRect.height / 2 - bannerRect.top;

      // Calculate distance between mouse and text center
      const deltaX = textCenterX - relativeX;
      const deltaY = textCenterY - relativeY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Define the "repulsion" radius and max movement based on screen size
      const repulsionRadius = isLargeScreen ? 600 : 400;
      const maxMove = isLargeScreen ? 500 : 200; // Much larger movement range for desktop

      if (distance < repulsionRadius) {
        // Calculate repulsion force (stronger when closer)
        const force =
          (1 - distance / repulsionRadius) * (isLargeScreen ? 200 : 100);

        // Calculate new position
        const moveX = (deltaX / distance) * force;
        const moveY = (deltaY / distance) * force;

        // Update position with boundaries
        x.set(Math.min(Math.max(moveX, -maxMove), maxMove));
        y.set(Math.min(Math.max(moveY, -maxMove), maxMove));
      } else {
        // Gradually return to center when mouse is far
        x.set(0);
        y.set(0);
      }
    };
    if (isLargeScreen) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [x, y, isLargeScreen]);

  return (
    <motion.div
      ref={bannerRef}
      className="section"
      id="banner"
      initial={{ opacity: 0, z: -200 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 1 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="content-fit">
        <motion.div
          ref={textRef}
          className="title"
          data-before="Digital Cover"
          initial={{ y: 100, opacity: 0, rotateX: 45 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          style={{
            x: xSpring,
            y: ySpring,
            userSelect: "none",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          }}
        >
          Digital Cover
        </motion.div>
      </div>

      <style jsx>{`
        .section#banner {
          padding: clamp(1rem, 4vw, 2rem) 0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .content-fit {
          position: relative;
          z-index: 2;
          width: min(1200px, 90vw);
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .title {
          color: white;
          font-size: clamp(3rem, 15vw, 11em);
          font-weight: bold;
          position: relative;
          text-align: center;
          width: 100%;
          line-height: 1;
          padding: 0 1rem;
          pointer-events: none;
        }

        .title::before {
          content: attr(data-before);
          position: absolute;
          inset: 0;
          z-index: -1;
          color: #2869f7;
          transform: translateY(clamp(0.5rem, 2vw, 1.5rem));
          font-size: 1em;
        }

        @media screen and (max-width: 1024px) {
          .title {
            font-size: clamp(2.5rem, 12vw, 8em);
          }
        }

        @media screen and (max-width: 768px) {
          .section#banner {
            padding: 1rem 0;
          }
          .title {
            font-size: clamp(2rem, 10vw, 6em);
          }
        }

        @media screen and (max-width: 480px) {
          .title {
            font-size: clamp(1.8rem, 8vw, 4em);
          }
          .title::before {
            transform: translateY(clamp(0.3rem, 1.5vw, 1rem));
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AvoidingBanner;
