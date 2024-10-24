import { motion } from "framer-motion";
import "./Description.css";
import DESC from "../../assets/images/desc.png";

export const Description = () => (
  <motion.div
    className="section"
    id="description"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    style={{ transformStyle: "preserve-3d" }}
  >
    <motion.div
      className="content-fit"
      style={{ transformStyle: "preserve-3d" }}
      whileInView={{
        transition: { staggerChildren: 0.2 },
      }}
    >
      <motion.div
        className="number "
        initial={{ y: 100, opacity: 0, z: -100 }}
        whileInView={{ y: 0, opacity: 1, z: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        02
      </motion.div>
      <motion.div
        className=""
        initial={{ y: 100, opacity: 0, z: -50 }}
        whileInView={{ y: 0, opacity: 1, z: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="title"
          style={{ color: "white" }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          DESCRIPTION
        </motion.div>
        <motion.p
          className="text-2xl ml-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          I specialize in crafting clean, modern, and visually impactful
          designs. With expertise in logo creation, branding, and user-friendly
          website and app interfaces, my focus is on delivering designs that
          balance aesthetics with functionality. Let's connect to discuss how we
          can collaborate...
        </motion.p>
      </motion.div>
    </motion.div>
    <motion.img
      src={DESC}
      className="decorate"
      alt=""
      style={{ width: "25vw", bottom: 0, right: 0, zIndex: 101 }}
      initial={{ x: 200, opacity: 0, rotateY: 45 }}
      whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
    />
  </motion.div>
);
