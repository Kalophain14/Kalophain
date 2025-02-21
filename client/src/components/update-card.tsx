import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Update } from "@shared/schema";

interface UpdateCardProps {
  update: Update;
}

export default function UpdateCard({ update }: UpdateCardProps) {
  return (
    <Card className={update.isUrgent ? "border-destructive" : undefined}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {update.isUrgent && (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            )}
            {update.title}
          </CardTitle>
          <Badge variant={getCategoryVariant(update.category)}>
            {update.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{update.content}</p>
        <time className="text-sm text-muted-foreground">
          {format(new Date(update.date), "PPP")}
        </time>
      </CardContent>
    </Card>
  );
}

function getCategoryVariant(category: string) {
  switch (category) {
    case "safety":
      return "destructive";
    case "maintenance":
      return "secondary";
    default:
      return "default";
  }
}
