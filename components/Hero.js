"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './ui/Button';

export default function HeroSection() {
  // Animation variants for the columns
  const column1Variants = {
    animate: {
      y: ["0%", "-20%", "0%"],
      transition: {
        y: {
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  };

  const column2Variants = {
    animate: {
      y: ["0%", "20%", "0%"],
      transition: {
        y: {
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-[#FFFADC]">
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        {/* Text Content (same as before) */}
        <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
         <h1  className="alfa-slab-one-regular text-4xl md:text-6xl font-bold mb-6 leading-tight">
  Turning Your <span className="text-[#B6F500]">Trust</span> into Belief
</h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            Discover how our innovative designs can elevate your environment. Let us help you create a space that reflects your style and vision.
          </p>
          <div className="flex space-x-4">
  <Button variant="primary">Explore</Button>
  <Button variant="secondary">Contact</Button>
          </div>
        </div>

        {/* Image Grid Columns with Framer Motion */}
     <div className="md:w-1/2 flex space-x-4 h-[700px] overflow-hidden">
  {/* Column 1 - Moves up continuously with pic and pic1 */}
  <motion.div
    animate={{
      y: ["0%", "-100%"],
      transition: {
        y: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }}
    className="w-1/2 space-y-4"
  >
    {['pic', 'pic1', 'pic', 'pic1', 'pic', 'pic1'].map((img, index) => (
      <div 
        key={`col1-${index}`} 
        className={`relative ${index % 2 === 0 ? 'h-64' : 'h-48'} rounded-xl overflow-hidden`}
      >
        <Image
          src={`/images/${img}.jpg`}
          alt={`Design ${index + 1}`}
          fill
          className="object-cover"
        />
      </div>
    ))}
  </motion.div>

  {/* Column 2 - Moves down continuously with pic1 and pic */}
  <motion.div
    animate={{
      y: ["-50%", "0%"],
      transition: {
        y: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }}
    className="w-1/2 space-y-4"
  >
    {['pic1', 'pic', 'pic1', 'pic', 'pic1', 'pic'].map((img, index) => (
      <div 
        key={`col2-${index}`}
        className={`relative ${index % 2 === 0 ? 'h-56' : 'h-72'} rounded-xl overflow-hidden`}
      >
        <Image
          src={`/images/${img}.jpg`}
          alt={`Design ${index + 4}`}
          fill
          className="object-cover"
        />
      </div>
    ))}
  </motion.div>
</div>
      </div>
    </section>
  );
}