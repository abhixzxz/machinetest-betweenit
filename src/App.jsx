import { motion, AnimatePresence } from "framer-motion";
import InteractiveBanner from "./pages/banner/banner";
import { Intro } from "./pages/intro/Intro";
import { Description } from "./pages/description/description";
import { Contact } from "./pages/contact/contact";
import Home from "./components/home/Home";
import "./App.css";
import { ChaoticFooter } from "./pages/footer/footer";
import { useEffect, useState } from "react";
import Loader from "./components/ui/loader/Loader";
import TrustedBySection from "./pages/truested/trusted";

const App = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 20 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ perspective: 2000 }}
      >
        {progress < 100 ? (
          <Loader progress={progress} />
        ) : (
          <motion.div
            className="content-wrapper"
            initial={{ z: -100 }}
            animate={{ z: 0 }}
            transition={{ duration: 1 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Home />
            <InteractiveBanner />
            <Intro />
            <Description />
            <TrustedBySection />
            <Contact />
            <ChaoticFooter />
          </motion.div>
        )}
        <div id="container3D"></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
