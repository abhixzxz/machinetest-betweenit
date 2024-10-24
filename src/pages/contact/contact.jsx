import { motion } from "framer-motion";
import "./Contact.css";
import { useState, useEffect } from "react";

const tableVariants = {
  hidden: { opacity: 0, rotateX: 45 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    z: -100,
    rotateX: 45,
  },
  visible: {
    opacity: 1,
    z: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};


const colors = [
  "#FF6B6B", // Coral Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#96CEB4", // Mint
  "#FFEEAD", // Cream Yellow
  "#D4A5A5", // Dusty Rose
  "#9B59B6", // Purple
  "#3498DB", // Blue
  "#E74C3C", // Red
  "#2ECC71", // Green
];

export const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate text position based on mouse position
  useEffect(() => {
    const text = document.getElementById("avoiding-text");
    if (!text) return;

    const rect = text.getBoundingClientRect();
    const textCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const dx = mousePosition.x - textCenter.x;
    const dy = mousePosition.y - textCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Maximum distance to react to mouse
    const maxDistance = 200;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 50;
      const moveX = (dx / distance) * -force;
      const moveY = (dy / distance) * -force;

      setTextPosition({ x: moveX, y: moveY });
    } else {
      setTextPosition({ x: 0, y: 0 });
    }
  }, [mousePosition]);

  // Function to get random color
  const getRandomColor = () => {
    const currentIndex = colors.indexOf(currentColor);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * colors.length);
    } while (newIndex === currentIndex);
    return colors[newIndex];
  };

  return (
    <motion.div
      className="section"
      id="contact"
      initial={{ opacity: 0, z: -100 }}
      whileInView={{ opacity: 1, z: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="content-fit">
        <motion.div
          className="number"
          initial={{ scale: 1.5, opacity: 0, z: -200 }}
          whileInView={{ scale: 1, opacity: 1, z: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          03
        </motion.div>
        <div className="des">
          <motion.div
            className="title"
            style={{ color: "white" }}
            initial={{ y: 100, opacity: 0, rotateX: 45 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            CONTACT
          </motion.div>
          <motion.table
            variants={tableVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <tbody>
              {[
                { label: "Email", value: "abhirajk0123@gmail.com" },
                { label: "Phone", value: "+91 8943936250" },
                {
                  label: "Website",
                  value: "abhirajk22.netlify.app",
                  isLink: true,
                },
                { label: "Country", value: "INDIA" },
              ].map((item, index) => (
                <motion.tr
                  key={item.label}
                  variants={rowVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <td>{item.label}</td>
                  <td>
                    {item.isLink ? (
                      <a href={`https://${item.value}`}>{item.value}</a>
                    ) : (
                      item.value
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
          <motion.div
            id="avoiding-text"
            className="sign"
            initial={{ scale: 0, opacity: 0, rotateY: 180 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.5,
            }}
            style={{
              transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
              color: currentColor,
              transition: "color 0.3s ease, transform 0.3s ease-out",
            }}
            onMouseEnter={() => setCurrentColor(getRandomColor())}
          >
            its me abhi
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
