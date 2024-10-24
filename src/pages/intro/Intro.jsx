import { motion } from "framer-motion";
import "./Intro.css";

export const Intro = () => (
  <motion.div
    className="section"
    id="intro"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <div className="content-fit">
      <motion.div
        className="number"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        01
      </motion.div>
      <motion.div
        className="des"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="title" style={{ color: "white" }}>
          3D Animation Design for Website
        </div>
        <motion.p
          className="text-2xl"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Creating immersive digital experiences through cutting-edge 3D
          animations and interactive design. Our approach combines technical
          expertise with artistic vision to deliver websites that captivate and
          engage users from the first moment. We specialize in pushing the
          boundaries of what&apos;s possible in web design, incorporating the
          latest technologies and trends while maintaining optimal performance
          and user experience.
        </motion.p>
      </motion.div>
    </div>
  </motion.div>
);
