import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Twitter, Instagram, Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import type { Profile, Project } from "@shared/schema";

export default function Home() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: featuredProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            {profile?.name || "Loading..."}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {profile?.title || "Loading..."}
          </p>
          <div className="flex justify-center gap-4 mb-12">
            {profile?.socialLinks && (
              <>
                {profile.socialLinks.twitter && (
                  <SocialLink href={profile.socialLinks.twitter} icon={Twitter} />
                )}
                {profile.socialLinks.instagram && (
                  <SocialLink href={profile.socialLinks.instagram} icon={Instagram} />
                )}
                {profile.socialLinks.github && (
                  <SocialLink href={profile.socialLinks.github} icon={Github} />
                )}
                {profile.socialLinks.linkedin && (
                  <SocialLink href={profile.socialLinks.linkedin} icon={Linkedin} />
                )}
              </>
            )}
          </div>
          <Link href="/projects">
            <Button size="lg" className="group">
              View Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full hover:bg-muted transition-colors"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}