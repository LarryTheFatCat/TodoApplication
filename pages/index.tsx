import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LandingNav from "@/components/homepage/nav";
import LandingHome from "@/components/homepage/home";
import LandingAbout from "@/components/homepage/about";
import LandingTestimonials from "@/components/homepage/testimonials";
import LandingContact from "@/components/homepage/contact";

export default function Home() {
  const [hasMounted, setHasMounted] = useState<Boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <LandingNav />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.75 }}
      >
        <div id="home">
          <LandingHome />
        </div>
        <div id="about">
          <LandingAbout />
        </div>
        <div id="testimonials">
          <LandingTestimonials />
        </div>
        <div id="contact">
          <LandingContact />
        </div>
      </motion.div>
    </>
  );
}
