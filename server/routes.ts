import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertProfileSchema, insertBlogPostSchema, insertMusicTrackSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Projects routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/featured", async (_req, res) => {
    const projects = await storage.getFeaturedProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProjectById(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.post("/api/projects", async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid project data" });
    }
    const project = await storage.createProject(result.data);
    res.status(201).json(project);
  });

  // Profile routes
  app.get("/api/profile", async (_req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.put("/api/profile", async (req, res) => {
    const result = insertProfileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid profile data" });
    }
    const profile = await storage.updateProfile(result.data);
    res.json(profile);
  });

  // Blog posts routes
  app.get("/api/blog", async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  });

  app.post("/api/blog", async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid blog post data" });
    }
    const post = await storage.createBlogPost(result.data);
    res.status(201).json(post);
  });

  // Music tracks routes
  app.get("/api/music", async (_req, res) => {
    const tracks = await storage.getMusicTracks();
    res.json(tracks);
  });

  app.get("/api/music/:id", async (req, res) => {
    const track = await storage.getMusicTrackById(Number(req.params.id));
    if (!track) {
      return res.status(404).json({ message: "Music track not found" });
    }
    res.json(track);
  });

  app.post("/api/music", async (req, res) => {
    const result = insertMusicTrackSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid music track data" });
    }
    const track = await storage.createMusicTrack(result.data);
    res.status(201).json(track);
  });

  return createServer(app);
}