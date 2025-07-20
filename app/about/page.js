"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function AboutSection() {
  return (
    <section className="py-20 bg-[#FFFADC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-[#B6F500]">CreativeHub</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We transform ideas into stunning visual experiences through creativity and technology.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src="/about/team.jpg"
              alt="Our team working together"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Our Story</h3>
            <p className="text-gray-600">
              Founded in 2015, CreativeHub began as a small team of passionate designers and developers 
              with a shared vision to create digital experiences that matter. Today, we've grown into a 
              full-service creative agency serving clients worldwide.
            </p>

            <h3 className="text-2xl font-bold mt-8">Our Approach</h3>
            <ul className="space-y-4">
              {[
                "Client-first philosophy",
                "Data-driven creative decisions",
                "Agile development process",
                "Transparent communication"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#B6F500] mr-3">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <Button variant="primary" href="/our-process">
                Learn About Our Process
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "150+", label: "Projects Completed" },
            { value: "95%", label: "Client Retention" },
            { value: "50+", label: "Team Members" },
            { value: "12", label: "Industry Awards" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
              <p className="text-4xl font-bold text-[#B6F500] mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}