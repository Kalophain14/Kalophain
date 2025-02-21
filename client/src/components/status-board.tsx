import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function StatusBoard() {
  const statuses = [
    {
      name: "Reactor Status",
      status: "Operational",
      icon: CheckCircle,
      variant: "success",
    },
    {
      name: "Safety Systems",
      status: "All Clear",
      icon: CheckCircle,
      variant: "success",
    },
    {
      name: "Next Maintenance",
      status: "Scheduled",
      icon: Clock,
      variant: "warning",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Current Station Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {statuses.map((status) => (
            <div
              key={status.name}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <status.icon className="h-5 w-5" />
                <span>{status.name}</span>
              </div>
              <Badge variant={status.variant as "default" | "success" | "warning"}>
                {status.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
