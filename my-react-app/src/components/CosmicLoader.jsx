
import { motion } from 'framer-motion';

const CosmicLoader = () => {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Outer ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="white"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        stroke="white"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Center circle (planet) */}
      <motion.circle
        cx="100"
        cy="100"
        r="30"
        fill="red"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      
      {/* Orbiting star */}
      <motion.circle
        cx="100"
        cy="20"
        r="5"
        fill="black"
        animate={{
          cx: [100, 180, 100, 20, 100],
          cy: [20, 100, 180, 100, 20],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
};

export default CosmicLoader;