import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

// Example blog posts (to be replaced with real data)
const posts = [
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Exploring the latest trends and best practices in web development, focusing on performance and user experience.",
    date: new Date(),
    slug: "building-modern-web-applications",
  },
  {
    id: 2,
    title: "My Journey in Tech",
    excerpt: "Reflecting on my experiences and growth as a developer, from learning the basics to building complex applications.",
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Blog</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Thoughts on development, design, and technology.
        </p>
        <div className="grid gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <time className="text-sm text-muted-foreground">
                    {format(post.date, "MMMM d, yyyy")}
                  </time>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}