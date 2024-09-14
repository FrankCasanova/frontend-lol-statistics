
import { motion } from 'framer-motion';

const FloatingAsteroids = () => {
  const asteroids = new Array(5).fill(null).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {asteroids.map((asteroid) => (
        <motion.div
          key={asteroid.id}
          className="absolute rounded-full bg-gray-700"
          style={{
            width: asteroid.size,
            height: asteroid.size,
            left: `${asteroid.initialX}%`,
            top: `${asteroid.initialY}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingAsteroids;