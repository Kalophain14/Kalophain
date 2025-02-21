import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsletterForm from "@/components/newsletter-form";
import StatusBoard from "@/components/status-board";
import UpdateCard from "@/components/update-card";
import type { Update } from "@shared/schema";

export default function Home() {
  const { data: updates, isLoading } = useQuery<Update[]>({
    queryKey: ["/api/updates"],
  });

  const urgentUpdates = updates?.filter((update) => update.isUrgent);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold mb-4">Nuclear Station Updates</h1>
          <p className="text-muted-foreground mb-6">
            Stay informed about safety updates and important announcements from our
            nuclear facility.
          </p>
          <NewsletterForm />
        </div>
        
        <div className="grid place-items-center">
          <img
            src="https://images.unsplash.com/photo-1516937941344-00b4e0337589"
            alt="Nuclear facility"
            className="rounded-lg object-cover w-full max-w-md"
          />
        </div>
      </div>

      <StatusBoard />

      {urgentUpdates && urgentUpdates.length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Important Safety Updates</AlertTitle>
          <AlertDescription>
            There are {urgentUpdates.length} urgent updates that require your
            attention.
          </AlertDescription>
        </Alert>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>Loading updates...</CardTitle>
              </CardHeader>
              <CardContent>Please wait...</CardContent>
            </Card>
          ) : (
            updates?.slice(0, 4).map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
