import { motion } from 'framer-motion';

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 1,
    },
  },
};

const dotVariants = {
  animate: {
    y: [0, -8, 0, 0, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop' as const,
      repeatDelay: 0.2,
    },
  },
};

const BounceLoading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <motion.div
        className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center space-x-1'
        variants={containerVariants}
        initial='initial'
        animate='animate'
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className='w-2 h-2 bg-blue-500 rounded-full'
            variants={dotVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BounceLoading;
