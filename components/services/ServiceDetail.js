// components/services/ServiceDetail.jsx
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function ServiceDetail({ service }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {service.description}
          </p>
          <Button href="/contact" variant="primary">
            Get Started
          </Button>
        </div>
        <div className="md:w-1/2">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={`/images/${service.id}.jpg`}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-3xl mb-4 text-[#B6F500] font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-gray-50 rounded-xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Our Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {["Discovery", "Planning", "Execution", "Delivery"].map(
            (step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#B6F500] flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium">{step}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to start your {service.title} project?
        </h2>
        <Button href="/contact" variant="primary" size="lg">
          Get a Free Quote
        </Button>
      </section>
    </div>
  );
}
