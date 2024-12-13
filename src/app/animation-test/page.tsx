'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: 200, height: 200, backgroundColor: 'blue' }}
      onClick={() => setIsVisible(!isVisible)}
    />
  );
};

export default Page;
