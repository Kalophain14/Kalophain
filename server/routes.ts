import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertUpdateSchema, insertFiredrillSchema, insertSubscriberSchema, insertProjectSchema, insertProfileSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Updates routes
  app.get("/api/updates", async (_req, res) => {
    const updates = await storage.getUpdates();
    res.json(updates);
  });

  app.get("/api/updates/:id", async (req, res) => {
    const update = await storage.getUpdateById(Number(req.params.id));
    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }
    res.json(update);
  });

  app.post("/api/updates", async (req, res) => {
    const result = insertUpdateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid update data" });
    }
    const update = await storage.createUpdate(result.data);
    res.status(201).json(update);
  });

  // Fire drills routes
  app.get("/api/firedrills", async (_req, res) => {
    const firedrills = await storage.getFiredrills();
    res.json(firedrills);
  });

  app.get("/api/firedrills/:id", async (req, res) => {
    const firedrill = await storage.getFiredrillById(Number(req.params.id));
    if (!firedrill) {
      return res.status(404).json({ message: "Fire drill not found" });
    }
    res.json(firedrill);
  });

  app.post("/api/firedrills", async (req, res) => {
    const result = insertFiredrillSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid fire drill data" });
    }
    const firedrill = await storage.createFiredrill(result.data);
    res.status(201).json(firedrill);
  });

  // Newsletter subscription route
  app.post("/api/subscribe", async (req, res) => {
    const result = insertSubscriberSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    try {
      const subscriber = await storage.createSubscriber(result.data);
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ message: "Email already subscribed" });
    }
  });

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

  return createServer(app);
}