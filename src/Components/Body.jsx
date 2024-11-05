import React from 'react'
import HeroSection from './Hero'
import { motion } from 'framer-motion'
import PhoneLists from './PhoneLists'


const Body = () => {
  return (
    <div>
      <motion.section initial={{ width: "0%" }} animate={{ width: "100%" }}
        transition={{ duration: 2 }}
        style={{  }} className='hero-section'>
        <HeroSection />
      </motion.section>
      <PhoneLists />
    </div>
  )
}

export default Body