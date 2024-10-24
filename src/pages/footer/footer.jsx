import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./Footer.css";

export const ChaoticFooter = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [isCalm, setIsCalm] = useState(true);
  const chaosMessages = [
    "🏃‍♂️ Run away!",
    "🙈 Can't catch me!",
    "💨 Whoosh!",
    "🎪 Circus time!",
    "🌪️ Chaos mode!",
    "🎭 Mass panic!",
    "🎪 Party panic!",
    "🎨 Art explosion!",
  ];

  useEffect(() => {
    const initialElements = [
      { id: "text1", content: "✨", type: "text" },
      { id: "text2", content: "🎮 Play", type: "text" },
      { id: "text3", content: "🎪", type: "text" },
      { id: "twitter", content: "🐦", type: "social" },
      { id: "github", content: "👾", type: "social" },
      { id: "linkedin", content: "💼", type: "social" },
      { id: "email", content: "✉️", type: "social" },
      { id: "star1", content: "⭐", type: "decoration" },
      { id: "star2", content: "🌟", type: "decoration" },
      { id: "star3", content: "💫", type: "decoration" },
      { id: "heart1", content: "💖", type: "decoration" },
      { id: "heart2", content: "💝", type: "decoration" },
    ].map((elem) => ({
      ...elem,
      x: 0,
      y: 0,
      baseX: 0,
      baseY: 0,
      rotation: 0,
      scale: 1,
    }));

    setElements(initialElements);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = footerRef.current;
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;

    const footer = footerRef.current.getBoundingClientRect();
    const centerX = footer.width / 2;
    const centerY = footer.height / 2;

    setElements((prevElements) => {
      return prevElements.map((elem) => {
        const elemRect = document
          .getElementById(elem.id)
          ?.getBoundingClientRect();
        if (!elemRect) return elem;

        const elemCenterX = elemRect.left - footer.left + elemRect.width / 2;
        const elemCenterY = elemRect.top - footer.top + elemRect.height / 2;

        const dx = mousePosition.x - elemCenterX;
        const dy = mousePosition.y - elemCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 150;

        if (distance < maxDistance) {
          setIsCalm(false);

          const force = (1 - distance / maxDistance) * 200;

          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI;


          const moveX = Math.cos(angle) * -force;
          const moveY = Math.sin(angle) * -force;


          const rotation = (Math.random() - 0.5) * 180;
          const scale = 0.8 + Math.random() * 0.4;

          return {
            ...elem,
            x: moveX,
            y: moveY,
            rotation,
            scale,
          };
        } else {

          return {
            ...elem,
            x: elem.x * 0.8,
            y: elem.y * 0.8,
            rotation: elem.rotation * 0.8,
            scale: 1 + (elem.scale - 1) * 0.8,
          };
        }
      });
    });
  }, [mousePosition]);

  // Randomly show chaos messages
  const [chaosMessage, setChaosMessage] = useState("");
  useEffect(() => {
    if (!isCalm) {
      const message =
        chaosMessages[Math.floor(Math.random() * chaosMessages.length)];
      setChaosMessage(message);
      const timer = setTimeout(() => setIsCalm(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCalm]);

  return (
    <motion.footer
      ref={footerRef}
      className="chaotic-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      <motion.div
        className="chaos-message"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isCalm ? 0 : 1,
          y: isCalm ? 20 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {chaosMessage}
      </motion.div>


      {elements.map((elem) => (
        <motion.div
          key={elem.id}
          id={elem.id}
          className={`chaotic-element ${elem.type}`}
          animate={{
            x: elem.x,
            y: elem.y,
            rotate: elem.rotation,
            scale: elem.scale,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          {elem.content}
        </motion.div>
      ))}
      <div className="">
        <h1 className="text-2xl">2024 - © Digital Cover</h1>
      </div>
    </motion.footer>
  );
};
