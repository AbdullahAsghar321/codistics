"use client"
import { useState } from "react";
import { motion } from "framer-motion";

export default function ServiceTabs({ services }) {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find(s => s.id === activeTab);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveTab(service.id)}
            className={`px-6 py-3 whitespace-nowrap font-medium transition ${
              activeTab === service.id 
                ? "text-[#B6F500] border-b-2 border-[#B6F500]" 
                : "text-gray-500 hover:text-[#B6F500]"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <h3 className="text-2xl font-bold">{activeService.title}</h3>
        <p className="text-gray-600 mt-4">{activeService.description}</p>

        <ul className="mt-6 space-y-4">
          {activeService.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[#B6F500] mt-1 text-lg">✓</span>
              <div>
                <h4 className="text-lg font-medium">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
