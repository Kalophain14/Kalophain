import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Firedrill } from "@shared/schema";

export default function FireDrills() {
  const { data: firedrills, isLoading } = useQuery<Firedrill[]>({
    queryKey: ["/api/firedrills"],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fire Drills Schedule</h1>
          <p className="text-muted-foreground">
            Stay informed about upcoming fire drills and safety exercises.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1496347315686-5f274d046ccc"
          alt="Fire drill"
          className="rounded-lg w-64 hidden md:block"
        />
      </div>

      {isLoading ? (
        <p>Loading schedule...</p>
      ) : (
        <div className="grid gap-4">
          {firedrills?.map((drill) => (
            <Card key={drill.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{drill.location}</CardTitle>
                  <Badge
                    variant={
                      drill.status === "completed"
                        ? "success"
                        : drill.status === "cancelled"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {drill.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  {drill.description}
                </p>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(drill.date), "PPP 'at' p")}
                </time>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
