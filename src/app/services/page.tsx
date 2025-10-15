import ServiceCard from '@/components/service-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServicesPage() {
    const services = [
        { name: 'Examen de Sangre Viva', description: 'Análisis profundo para un diagnóstico preventivo.', imageId: 'service-blood-test' },
        { name: 'Fisioterapia y Terapia Vital', description: 'Restauración integral que combina técnicas tradicionales y naturales.', imageId: 'service-physiotherapy' },
        { name: 'Hidroterapia', description: 'El poder curativo del agua para estimular la circulación y eliminar toxinas.', imageId: 'service-hydrotherapy' },
        { name: 'Medicina Biológica', description: 'Terapias biológicas para la restauración de la salud.', imageId: 'service-biological-medicine'},
        { name: 'Consultas Nutricionales', description: 'Planes de alimentación personalizados para tus objetivos.', imageId: 'service-nutrition' },
        { name: 'Alimentación Terapéutica', description: 'Platos veganos equilibrados con ingredientes frescos y naturales.', imageId: 'service-herbalism' },
        { name: 'Medicamentos Naturales', description: 'Productos 100% naturales, desde hierbas hasta fórmulas personalizadas.', imageId: 'service-natural-meds'},
        { name: 'Terapias Intravenosas', description: 'Nutrientes y vitaminas administrados directamente para una absorción completa.', imageId: 'service-iv-therapy' },
    ];

    return (
        <div className="container py-12">
            <h1 className="font-headline text-5xl mb-8 text-center">Our Services</h1>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                We offer a range of holistic services in our Mexico and California locations to support your wellness journey from the inside out.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {services.map((service) => {
                const img = PlaceHolderImages.find(p => p.id === service.imageId);
                return img ? <ServiceCard key={service.name} {...service} imageUrl={img.imageUrl} imageHint={img.imageHint} /> : null;
                })}
            </div>
        </div>
    );
}
