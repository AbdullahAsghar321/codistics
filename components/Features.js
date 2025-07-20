"use client"
import { motion } from "framer-motion"
import Button from "./ui/Button"

const features = [
  {
    title: "Seamless Integration",
    subtitle: "with Existing Systems",
    description: "Easily incorporate our tools into your workflow.",
    icon: "🔌" // Replace with your icon component
  },
  {
    title: "Exceptional Support",
    subtitle: "Whenever You Need It",
    description: "Our dedicated team is here to assist you.",
    icon: "🛟" // Replace with your icon component
  },
  {
    title: "Customization for",
    subtitle: "Every User",
    description: "Tailor our solutions to fit your specific needs.",
    icon: "⚙️" // Replace with your icon component
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-[#FFFADC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="alfa-slab-one-regular text-4xl md:text-5xl font-bold mb-6"
          >
            Discover Our <span className="text-[#B6F500]">Unique Features</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our offerings are designed to elevate your experience. Explore features that are not only functional but also visually stunning.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-black p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-6 text-[#B6F500]">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-white">
                {feature.title} <span className="text-[#B6F500]">{feature.subtitle}</span>
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button variant="primary">Learn More</Button>
          <Button variant="secondary">Sign Up</Button>
        </motion.div>
      </div>
    </section>
  )
}