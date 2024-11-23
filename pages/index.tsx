import LandingPage from "@/components/home/nav";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [hasMounted, setHasMounted] = useState<Boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  },[])
  if(!hasMounted) return null;
  return (
    <>
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>

      <LandingPage />
    </motion.div>
    </>
  );
}
