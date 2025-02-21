import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import UpdateCard from "@/components/update-card";
import { useState } from "react";
import type { Update } from "@shared/schema";

export default function Updates() {
  const [search, setSearch] = useState("");
  const { data: updates, isLoading } = useQuery<Update[]>({
    queryKey: ["/api/updates"],
  });

  const filteredUpdates = updates?.filter(
    (update) =>
      update.title.toLowerCase().includes(search.toLowerCase()) ||
      update.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">All Updates</h1>
        <Input
          placeholder="Search updates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {isLoading ? (
        <p>Loading updates...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredUpdates?.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      )}
    </div>
  );
}
