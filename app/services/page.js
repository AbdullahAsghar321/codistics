import ServiceCards from "@/components/services/ServiceCard";
import ServiceTabs from "@/components/services/ServiceTab";
import { servicesData } from "@/data/services";

export default function ServicesPage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-xl mt-4 max-w-2xl mx-auto">
          Comprehensive creative solutions for your business
        </p>
      </section>

      {/* Service Cards */}
      <ServiceCards services={servicesData} />

      {/* Service Tabs */}
      <ServiceTabs services={servicesData} />

      {/* CTA */}
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to start your project?</h3>
        <a href="/contact" className="px-6 py-3 bg-[#B6F500] text-black font-medium rounded-lg hover:bg-[#9ED600] transition">
          Get a Free Consultation
        </a>
      </div>
    </div>
  )
}