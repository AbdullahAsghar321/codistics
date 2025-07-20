import ServiceDetail from "@/components/services/ServiceDetail";
import { servicesData } from "@/data/services";

export default function ServicePage({ params }) {
  const service = servicesData.find(s => s.id === params.service);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="space-y-20">
      <ServiceDetail service={service} />
    </div>
  )
}