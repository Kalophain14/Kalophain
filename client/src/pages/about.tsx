import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          About Me
        </h1>

        <div className="prose prose-lg dark:prose-invert">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hi, I'm Temoso Chueu, a passionate full-stack developer based in Cape Town,
            South Africa. I specialize in building modern web applications that combine
            beautiful design with robust functionality.
          </p>

          <div className="flex flex-col gap-2 my-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:temoso@example.com" className="hover:text-primary transition-colors">
                temoso@example.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Cape Town, South Africa</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6">Skills & Expertise</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="font-medium mb-2">Frontend Development</h3>
              <p className="text-muted-foreground">
                React, TypeScript, Tailwind CSS, Framer Motion
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Backend Development</h3>
              <p className="text-muted-foreground">
                Node.js, Express, PostgreSQL, API Design
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tools & Practices</h3>
              <p className="text-muted-foreground">
                Git, CI/CD, Test-Driven Development, Agile Methodologies
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/projects">
              <Button size="lg" className="group">
                View My Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}