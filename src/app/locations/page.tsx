import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function LocationsPage() {
    const locations = [
        {
            name: "California Flagship",
            address: "123 Wellness Way, Los Angeles, CA 90210",
        },
        {
            name: "Mexico City Hub",
            address: "456 Avenida de la Salud, CDMX, 06700",
        }
    ]

    return (
        <div className="container py-12">
            <h1 className="font-headline text-5xl mb-8 text-center">Our Locations</h1>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                Visit us in person to explore our products and meet our team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {locations.map((location) => (
                    <Card key={location.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <MapPin className="text-primary" />
                                {location.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{location.address}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* Placeholder for a map component */}
            <div className="mt-12 w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map will be displayed here</p>
            </div>
        </div>
    );
}
