import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

// Example blog posts (to be replaced with real data)
const posts = [
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Exploring the latest trends and best practices in web development",
    date: new Date(),
    slug: "building-modern-web-applications",
  },
  {
    id: 2,
    title: "My Journey in Tech",
    excerpt: "Reflecting on my experiences and growth as a developer",
    date: new Date(),
    slug: "my-journey-in-tech",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="group cursor-pointer">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <time className="text-sm text-muted-foreground">
                  {format(post.date, "MMMM d, yyyy")}
                </time>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
