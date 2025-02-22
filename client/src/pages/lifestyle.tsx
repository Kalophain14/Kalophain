import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Example lifestyle content (to be replaced with real data)
const posts = [
  {
    id: 1,
    title: "My Development Setup",
    description: "A look into my workspace and the tools I use daily",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  },
  {
    id: 2,
    title: "Work-Life Balance",
    description: "How I maintain productivity while staying healthy",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
];

export default function Lifestyle() {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-12">Lifestyle</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="group cursor-pointer overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-muted-foreground">{post.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
