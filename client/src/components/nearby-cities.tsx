import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface CityLink {
  name: string;
  href: string;
}

interface NearbyCitiesProps {
  title?: string;
  cities: CityLink[];
}

export function NearbyCities({ title = "Nearby California Cities", cities }: NearbyCitiesProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <Card className="my-12">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map((c) => (
            <Link key={c.href} href={c.href}>
              <div className="flex items-center space-x-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <Building2 className="h-4 w-4 text-primary" />
                <span>{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


