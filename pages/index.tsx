import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LandingNav from "@/components/home/nav";
import LandingHome from "@/components/home/home";

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
        <LandingHome />
      </motion.div>
    </>
  );
}
