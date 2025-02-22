import { type Update, type InsertUpdate, type Firedrill, type InsertFiredrill, type Subscriber, type InsertSubscriber } from "@shared/schema";
import { type Project, type InsertProject, type Profile, type InsertProfile } from "@shared/schema";

export interface IStorage {
  // Updates
  getUpdates(): Promise<Update[]>;
  getUpdateById(id: number): Promise<Update | undefined>;
  createUpdate(update: InsertUpdate): Promise<Update>;

  // Fire Drills
  getFiredrills(): Promise<Firedrill[]>;
  getFiredrillById(id: number): Promise<Firedrill | undefined>;
  createFiredrill(firedrill: InsertFiredrill): Promise<Firedrill>;

  // Subscribers
  getSubscribers(): Promise<Subscriber[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getFeaturedProjects(): Promise<Project[]>;

  // Profile
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: InsertProfile): Promise<Profile>;
}

export class MemStorage implements IStorage {
  private updates: Map<number, Update>;
  private firedrills: Map<number, Firedrill>;
  private subscribers: Map<number, Subscriber>;
  private projects: Map<number, Project>;
  private profile: Profile | undefined;
  private currentIds: { updates: number; firedrills: number; subscribers: number; projects: number };

  constructor() {
    this.updates = new Map();
    this.firedrills = new Map();
    this.subscribers = new Map();
    this.projects = new Map();
    this.currentIds = { updates: 1, firedrills: 1, subscribers: 1, projects: 1 };
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock updates
    const mockUpdates: InsertUpdate[] = [
      {
        title: "Routine Maintenance Schedule",
        content: "Annual maintenance check of reactor cooling systems scheduled for next week.",
        category: "maintenance",
        isUrgent: false,
        date: new Date(),
      },
      {
        title: "Safety Protocol Update",
        content: "New safety protocols implemented for radiation monitoring.",
        category: "safety",
        isUrgent: true,
        date: new Date(),
      },
    ];

    mockUpdates.forEach(update => {
      const id = this.currentIds.updates++;
      const newUpdate = { 
        ...update, 
        id, 
        date: update.date || new Date(),
        isUrgent: update.isUrgent === undefined ? false : update.isUrgent 
      };
      this.updates.set(id, newUpdate);
    });

    // Mock fire drills
    const mockFiredrills: InsertFiredrill[] = [
      {
        location: "Reactor Building A",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        description: "Quarterly emergency response drill",
        status: "scheduled",
      },
      {
        location: "Control Room Complex",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        description: "Standard evacuation procedure test",
        status: "completed",
      },
    ];

    // Sample projects
    const mockProjects: InsertProject[] = [
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform built with React and Node.js",
        imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
        technologies: ["React", "Node.js", "PostgreSQL", "Typescript"],
        projectUrl: "https://ecommerce.example.com",
        githubUrl: "https://github.com/username/ecommerce",
        featured: true,
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website with dynamic content management",
        imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
        projectUrl: "https://portfolio.example.com",
        githubUrl: "https://github.com/username/portfolio",
        featured: true,
      },
    ];

    // Sample profile
    const mockProfile: InsertProfile = {
      name: "Temoso Chueu",
      title: "Full Stack Developer",
      bio: "Passionate developer crafting digital experiences with modern web technologies",
      email: "john@example.com",
      location: "Cape Town, South Africa",
      socialLinks: {
        twitter: "https://x.com/kalophain?s=21",
        instagram: "https://www.instagram.com/kalophain14",
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
      },
    };

    mockFiredrills.forEach(drill => this.createFiredrill(drill));
    mockProjects.forEach(project => this.createProject(project));
    this.updateProfile(mockProfile);
  }

  async getUpdates(): Promise<Update[]> {
    return Array.from(this.updates.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getUpdateById(id: number): Promise<Update | undefined> {
    return this.updates.get(id);
  }

  async createUpdate(update: InsertUpdate): Promise<Update> {
    const id = this.currentIds.updates++;
    const newUpdate = { 
      ...update, 
      id, 
      date: update.date || new Date(),
      isUrgent: update.isUrgent === undefined ? false : update.isUrgent 
    };
    this.updates.set(id, newUpdate);
    return newUpdate;
  }

  async getFiredrills(): Promise<Firedrill[]> {
    return Array.from(this.firedrills.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getFiredrillById(id: number): Promise<Firedrill | undefined> {
    return this.firedrills.get(id);
  }

  async createFiredrill(firedrill: InsertFiredrill): Promise<Firedrill> {
    const id = this.currentIds.firedrills++;
    const newFiredrill = { ...firedrill, id };
    this.firedrills.set(id, newFiredrill);
    return newFiredrill;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentIds.subscribers++;
    const newSubscriber = { ...subscriber, id };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentIds.projects++;
    const newProject = {
      ...project,
      id,
      createdAt: new Date(),
      projectUrl: project.projectUrl || null,
      githubUrl: project.githubUrl || null,
      featured: project.featured || false,
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async updateProfile(profile: InsertProfile): Promise<Profile> {
    const newProfile: Profile = { 
      ...profile, 
      id: 1,
      location: profile.location || null,
      avatarUrl: profile.avatarUrl || null,
      socialLinks: {
        twitter: profile.socialLinks.twitter || undefined,
        instagram: profile.socialLinks.instagram || undefined,
        github: profile.socialLinks.github || undefined,
        linkedin: profile.socialLinks.linkedin || undefined
      }
    };
    this.profile = newProfile;
    return newProfile;
  }
}

export const storage = new MemStorage();