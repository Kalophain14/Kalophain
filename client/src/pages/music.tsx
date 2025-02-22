import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Example music content (to be replaced with real data)
const musicContent = [
  {
    id: 1,
    title: "Latest Tracks",
    description: "My recent musical creations and experiments",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
  {
    id: 2,
    title: "Playlists",
    description: "Curated collections of music that inspire me",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
  },
];

export default function Music() {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-12">Music</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {musicContent.map((item) => (
            <Card key={item.id} className="group cursor-pointer overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
