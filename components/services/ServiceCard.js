"use client"
import Link from "next/link";

export default function ServiceCards({ services }) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="border rounded-lg p-6 hover:shadow-lg transition relative"
          >
            {/* Recommended Badge */}
            {service.recommended && (
              <div className="absolute top-2 right-2 bg-[#B6F500] text-black text-xs font-semibold px-2 py-1 rounded">
                Recommended
              </div>
            )}

            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="mt-2 text-gray-600">{service.summary}</p>
            <div className="mt-4 text-[#B6F500] font-medium">
              Learn more →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
